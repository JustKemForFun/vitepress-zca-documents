export type UpdateGroupSettingsOptions = {
    /**
     * Không cho phép thành viên thay đổi tên và ảnh đại diện nhóm
     */
    blockName?: boolean;
    /**
     * Đánh dấu tin nhắn từ trưởng/phó nhóm
     */
    signAdminMsg?: boolean;
    /**
     * Không cho phép thành viên ghim tin nhắn, ghi chú, bình chọn lên đầu hội thoại
     */
    setTopicOnly?: boolean;
    /**
     * Cho phép thành viên mới đọc tin nhắn gần nhất
     */
    enableMsgHistory?: boolean;
    /**
     * Chế độ phê duyệt thành viên mới
     */
    joinAppr?: boolean;
    /**
     * Không cho phép thành viên tạo mới ghi chú, nhắc hẹn
     */
    lockCreatePost?: boolean;
    /**
     * Không cho phép thành viên tạo mới bình chọn
     */
    lockCreatePoll?: boolean;
    /**
     * Không cho phép thành viên gửi tin nhắn
     */
    lockSendMsg?: boolean;
    /**
     * Không cho phép thành viên xem đầy đủ danh sách thành viên (cho cộng đồng)
     */
    lockViewMember?: boolean;
};

export type UpdateGroupSettingsResponse = "";