import { ApiItem, ApiMarketResponse } from './apiTypes';
import { shards, soil } from './ids';
import { ApiResult } from './types';

async function universalisRequest<T>(path: string): Promise<ApiResult<T>> {
    const url = `https://universalis.app/api/v2/${path}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        if(response.status === 200) {
            const json = (await response.json()) as T;
            return {error: false, response: json};
        }
        return {error:true};
    } catch {
        return {error:true};
    }
}

export async function getShardMarket(worldId: number): Promise<ApiResult<ApiMarketResponse>> {
    const idParam = shards.map((shard) => shard.id.toString()).join(',');
    const path = `${worldId.toString()}/${idParam}`;
    return await universalisRequest<ApiMarketResponse>(path);
}

export async function getSeedMarket(dc: string): Promise<ApiResult<ApiMarketResponse>> {
    const idParam = shards.map((shard) => shard.seed.id.toString()).join(',');
    const path = `${dc}/${idParam}`;
    return await universalisRequest<ApiMarketResponse>(path);
}

export async function getSoilMarket(dc: string): Promise<ApiResult<ApiItem>> {
    const path = `${dc}/${soil.id}`;
    return await universalisRequest<ApiItem>(path);
}
