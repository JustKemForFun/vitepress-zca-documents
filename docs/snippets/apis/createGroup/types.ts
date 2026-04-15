export type CreateGroupResponse = {
    groupType: number;
    sucessMembers: string[];
    groupId: string;
    errorMembers: string[];
    error_data: Record<string, unknown>;
};

export type CreateGroupOptions = {
    /**
     * Tên nhóm
     */
    name?: string;
    /**
     * Danh sách ID thành viên nhóm (trừ bản thân)
     */
    members: string[];
    /**
     * Ảnh nhóm (tùy chọn)
     */
    avatarSource?: AttachmentSource;
    /**
     * Path to the avatar image file
     * @deprecated Use `avatarSource` instead
     */
    avatarPath?: string;
};