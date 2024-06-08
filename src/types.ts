import { ApiItem, ApiMarketResponse } from "./apiTypes";

export type Settings = {
    dc?: string;
    worldId?: number;
    plantCount?: number;
    sellerTax?: number;
};

export type ApiResult<T> = {
    error: boolean,
    response?: T
}

export interface CommonProps {
    error: boolean;
    setError: (error: boolean) => void;
    settings: Settings;
    setSettings: (settings: Settings) => void;
    shardMarket: ApiMarketResponse | null;
    setShardMarket: (shardMarket: ApiMarketResponse) => void;
    seedMarket: ApiMarketResponse | null;
    setSeedMarket: (shardMarket: ApiMarketResponse) => void;
    soilMarket: ApiItem | null;
    setSoilMarket: (shardMarket: ApiItem) => void;
}
