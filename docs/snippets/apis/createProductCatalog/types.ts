export type CreateProductCatalogPayload = {
    /**
     * Id của danh mục sản phẩm
     */
    catalogId: string;

    productName: string;
    price: string;
    description: string;
    
    /**
     * Tối đa 5 tệp, bỏ qua nếu dùng product_photos
     */
    files?: AttachmentSource[];
    /**
     * Danh sách URL ảnh sản phẩm, tối đa 5
     *
     * Có thể lấy URL tệp thủ công với api `uploadProductPhoto`
     */
    product_photos?: string[];
};

export type CreateProductCatalogResponse = {
    item: ProductCatalogItem;
    version_ls_catalog: number;
    version_catalog: number;
};