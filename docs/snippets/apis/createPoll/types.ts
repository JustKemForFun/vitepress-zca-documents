export type CreatePollOptions = {
    /**
     * Câu hỏi.
     */
    question: string;
    /**
     * Danh sách các lựa chọn.
     */
    options: string[];
    /**
     * Thời hạn của cuộc bình chọn, đơn vị mili giây, mặc định 0 (vô hạn).
     */
    expiredTime?: number;
    /**
     * Cho phép chọn nhiều lựa chọn, mặc định false.
     */
    allowMultiChoices?: boolean;
    /**
     * Cho phép thành viên thêm lựa chọn, mặc định false.
     */
    allowAddNewOption?: boolean;
    /**
     * Ẩn kết quả cho đến khi người dùng bình chọn, mặc định false.
     */
    hideVotePreview?: boolean;
    /**
     * Ẩn danh sách người bình chọn, mặc định false.
     */
    isAnonymous?: boolean;
};

export type CreatePollResponse = PollDetail;