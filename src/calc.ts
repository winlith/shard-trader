import { ApiItem, ApiMarketResponse } from './apiTypes';
import { servers, shards } from './ids';
import { CalculationResult, SingleCalculation } from './types';

export function calculate(
    shardMarket: ApiMarketResponse,
    seedMarket: ApiMarketResponse,
    soilMarket: ApiItem,
    saleTaxPercent: number,
    plantCount: number
): CalculationResult {
    const saleTaxMultiplier = (100 - saleTaxPercent) / 100;
    const worldIds = servers
        .find((dc) => dc.name === seedMarket.dcName)!
        .worlds.map((w) => w.id);

    const bestShardPrices = shards.map((s) => {
        return {
            id: s.id,
            price: Math.floor(
                shardMarket.items[s.id.toString()].minPrice * saleTaxMultiplier
            ),
        };
    });

    const bestSeedPrices = shards
        .map((shard) => shard.seed)
        .map((seed) => {
            let bestPrice = 999999999;
            let bestWorldId = 0;
            worldIds.forEach((worldId) => {
                const listings = seedMarket.items[seed.id.toString()].listings
                    .filter((listing) => listing.worldID === worldId)
                    .sort((a, b) => a.pricePerUnit - b.pricePerUnit);
                let totalQuant = 0;
                listings.forEach((listing) => {
                    totalQuant += listing.quantity;
                });
                if (totalQuant < plantCount) return;
                let quant = 0;
                let totalPrice = 0;
                let index = 0;
                while (quant < plantCount) {
                    quant += listings[index].quantity;
                    totalPrice += listings[index].total;
                    index += 1;
                }
                const avgPrice = Math.round(totalPrice / quant);
                if (avgPrice < bestPrice) {
                    bestPrice = avgPrice;
                    bestWorldId = listings[0].worldID;
                }
            });
            return {
                id: seed.id,
                price: Math.floor(bestPrice * 1.05),
                worldId: bestWorldId,
            };
        });

    const allSoilPrices = worldIds.map((worldId) => {
        const listings = soilMarket.listings
            .filter((listing) => listing.worldID === worldId)
            .sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        let totalQuant = 0;
        listings.forEach((listing) => {
            totalQuant += listing.quantity;
        });
        if (totalQuant < plantCount)
            return { worldId: worldId, price: 999999999 };
        let quant = 0;
        let totalPrice = 0;
        let index = 0;
        while (quant < plantCount) {
            quant += listings[index].quantity;
            totalPrice += listings[index].total;
            index += 1;
        }
        const avgPrice = Math.round(totalPrice / quant);
        return { worldId: worldId, price: Math.floor(avgPrice * 1.05) };
    });

    const bestSoilPrice = allSoilPrices.sort((a, b) => a.price - b.price)[0];

    const profitsPerPlant = shards
        .map((shard) => shard.id)
        .map((shardId) => {
            const totalGain =
                bestShardPrices.find(
                    (bestShardPrice) => bestShardPrice.id === shardId
                )!.price * 100;
            const bestSeedOffer = bestSeedPrices.find(
                (bestSeedPrice) =>
                    bestSeedPrice.id ===
                    shards.find((shard) => shard.id === shardId)!.seed.id
            )!;
            const seedCost = bestSeedOffer.price;
            const soilCost = bestSoilPrice.price;
            return { id: shardId, profit: totalGain - seedCost - soilCost };
        });

    const totalProfits = profitsPerPlant.map((p) => {
        return { id: p.id, profit: p.profit * plantCount };
    });

    const bestShard = profitsPerPlant
        .sort((a, b) => a.profit - b.profit)
        .reverse()[0].id;

    const calculations: SingleCalculation[] = shards.map((shard) => {
        return {
            shardId: shard.id,
            seedId: shard.seed.id,
            shardSalePrice: bestShardPrices.find((b) => b.id === shard.id)!
                .price,
            seedPrice: bestSeedPrices.find((b) => b.id === shard.seed.id)!
                .price,
            seedWorldId: bestSeedPrices.find((b) => b.id === shard.seed.id)!
                .worldId,
            soilPrice: bestSoilPrice.price,
            soilWorldId: bestSoilPrice.worldId,
            profitPerPlant: profitsPerPlant.find((b) => b.id === shard.id)!
                .profit,
            totalProfit: totalProfits.find((b) => b.id === shard.id)!.profit,
        };
    });

    return { bestShard, calculations };
}
