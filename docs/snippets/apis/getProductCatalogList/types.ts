export type GetProductCatalogListPayload = {
    catalogId: string;
    /**
     * Mặc định 100
     */
    limit?: number;
    versionCatalog?: number;
    lastProductId?: string;
    /**
     * Mặc định 0
     */
    page?: number;
};

export type GetProductCatalogListResponse = {
    items: ProductCatalogItem[];
    version: number;
    has_more: number;
};