export type UpdateCatalogPayload = {
    catalogId: string;
    catalogName: string;
};

export type UpdateCatalogResponse = {
    item: CatalogItem;
    version_ls_catalog: number;
    version_catalog: number;
};