export type GetGroupBlockedMemberPayload = {
    /**
     * Mặc định 1
     */
    page?: number;
    /**
     * Mặc định 50
     */
    count?: number;
};

export type GetGroupBlockedMemberResponse = {
    blocked_members: {
        id: string;
        dName: string;
        zaloName: string;
        avatar: string;
        avatar_25: string;
        accountStatus: number;
        type: number;
    }[];
    has_more: number;
};