export type GetCatalogListPayload = {
    /**
     * Mặc định 20
     */
    limit?: number;
    lastProductId?: number;
    /**
     * Mặc định 0
     */
    page?: number;
};

export type GetCatalogListResponse = {
    items: CatalogItem[];
    version: number;
    has_more: number;
};