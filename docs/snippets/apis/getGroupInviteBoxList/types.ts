export type GetGroupInviteBoxListPayload = {
    mpage?: number;
    page?: number;
    invPerPage?: number;
    mcount?: number;
};

export type GetGroupInviteBoxListResponse = {
    invitations: {
        groupInfo: GroupInfo;
        inviterInfo: {
            id: string;
            dName: string;
            zaloName: string;
            avatar: string;
            avatar_25: string;
            accountStatus: number;
            type: number;
        };
        grCreatorInfo: {
            id: string;
            dName: string;
            zaloName: string;
            avatar: string;
            avatar_25: string;
            accountStatus: number;
            type: number;
        };
        /**
         * Thời gian hết hạn lời mời
         */
        expiredTs: string;
        type: number;
    }[];
    total: number;
    hasMore: boolean;
};