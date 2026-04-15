export type GetGroupLinkInfoPayload = {
    link: string;
    /**
     * Mặc định 1
     */
    memberPage?: number;
};

export type GetGroupLinkInfoResponse = {
    groupId: string;
    name: string;
    desc: string;
    type: number;
    creatorId: string;
    avt: string;
    fullAvt: string;
    adminIds: string[];
    currentMems: {
        id: string;
        dName: string;
        zaloName: string;
        avatar: string;
        avatar_25: string;
        accountStatus: number;
        type: number;
    }[];
    admins: unknown[];
    hasMoreMember: number;
    subType: number;
    totalMember: number;
    setting: GroupSetting;
    globalId: string;
};