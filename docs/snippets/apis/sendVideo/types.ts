export type SendVideoOptions = {
    /**
     * Tin nhắn
     */
    msg?: string;
    /**
     * URL của video
     */
    videoUrl: string;
    /**
     * URL của ảnh thumbnail
     */
    thumbnailUrl: string;
    /**
     * Thời gian video, đơn vị mili giây, ví dụ: video duration: 5.5s => 5.5 * 1000 = 5500
     */
    duration?: number;
    /**
     * Chiều rộng của video
     */
    width?: number;
    /**
     * Chiều cao của video
     */
    height?: number;
    /**
     * Thời gian tồn tại, mặc định 0 (vô hạn)
     */
    ttl?: number;
};

export type SendVideoResponse = {
    msgId: number;
};