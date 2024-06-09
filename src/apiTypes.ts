export type ApiMarketResponse = {
    itemIDs: number[];
    items: { [key: string]: ApiItem };
    dcName?: string;
    worldID?: number;
    worldName?: string;
    unresolvedItems: any[];
};

export type ApiItem = {
    itemID: number;
    lastUploadTime: number;
    listings: ApiListing[];
    recentHistory: ApiRecentHistory[];
    dcName: string;
    currentAveragePrice: number;
    currentAveragePriceNQ: number;
    currentAveragePriceHQ: number;
    regularSaleVelocity: number;
    nqSaleVelocity: number;
    hqSaleVelocity: number;
    averagePrice: number;
    averagePriceNQ: number;
    averagePriceHQ: number;
    minPrice: number;
    minPriceNQ: number;
    minPriceHQ: number;
    maxPrice: number;
    maxPriceNQ: number;
    maxPriceHQ: number;
    stackSizeHistogram: { [key: string]: number };
    stackSizeHistogramNQ: { [key: string]: number };
    stackSizeHistogramHQ: { [key: string]: number };
    worldUploadTimes: { [key: string]: number };
    listingsCount: number;
    recentHistoryCount: number;
    unitsForSale: number;
    unitsSold: number;
};

export type ApiListing = {
    lastReviewTime: number;
    pricePerUnit: number;
    quantity: number;
    stainID: number;
    worldName: string;
    worldID: number;
    creatorName: string;
    creatorID: null;
    hq: boolean;
    isCrafted: boolean;
    listingID: string;
    materia: any[];
    onMannequin: boolean;
    retainerCity: number;
    retainerID: string;
    retainerName: string;
    sellerID: string;
    total: number;
    tax: number;
};

export type ApiRecentHistory = {
    hq: boolean;
    pricePerUnit: number;
    quantity: number;
    timestamp: number;
    onMannequin: boolean;
    worldName: string;
    worldID: number;
    buyerName: string;
    total: number;
};

export type ApiTaxRates = {
    [key: string]: number;
};
