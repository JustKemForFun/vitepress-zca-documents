export type GetBizAccountResponse = {
    biz?: {
        desc: string | null;
        cate: BusinessCategory;
        addr: string;
        website: string;
        email: string;
    };
    setting_start_page?: {
        enable_biz_label: number;
        enable_cate: number;
        enable_add: number;
        cta_profile: number;
        /**
         * Đường dẫn tương đối để xây dựng URL danh mục sản phẩm.
         *
         * Ví dụ: https://catalog.zalo.me/${cta_catalog}
         */
        cta_catalog: string | null;
    } | null;
    pkgId: number;
};