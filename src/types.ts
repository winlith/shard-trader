import { ApiItem, ApiMarketResponse } from './apiTypes';

export type Settings = {
    dc?: string;
    worldId?: number;
    plantCount?: number;
    saleTax?: number;
};

export type ApiResult<T> = {
    error: boolean;
    response?: T;
};

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

export type SingleCalculation = {
    shardId: number;
    seedId: number;
    shardSalePrice: number;
    seedPrice: number;
    seedWorldId: number;
    soilPrice: number;
    soilWorldId: number;
    profitPerPlant: number;
    totalProfit: number;
};

export type CalculationResult = {
    bestShard: number;
    calculations: SingleCalculation[];
};
