import { ApiMarketResponse } from './apiTypes';
import { shards } from './ids';

export async function getShardPrices(worldId: number) {
    const idParam = shards.map((shard) => shard.id.toString()).join(',');
    const url = `https://universalis.app/api/v2/${worldId.toString()}/${idParam}?noGst=1`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const json = (await response.json()) as ApiMarketResponse;
    } catch {
        return;
    }
}
