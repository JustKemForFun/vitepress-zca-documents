export type UpdateProductCatalogPayload = {
    catalogId: string;

    productId: string;
    productName: string;
    price: string;
    description: string;
    createTime: number;
    
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

export type UpdateProductCatalogResponse = {
    item: ProductCatalogItem;
    version_ls_catalog: number;
    version_catalog: number;
};