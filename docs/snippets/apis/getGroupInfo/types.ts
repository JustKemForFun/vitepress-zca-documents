export type GroupInfoResponse = {
    removedsGroup: string[];
    unchangedsGroup: string[];
    gridInfoMap: {
        [groupId: string]: GroupInfo & {
            memVerList: string[];
            pendingApprove: GroupInfoPendingApprove;
        };
    };
};

export type GroupInfoPendingApprove = {
    time: number;
    uids: string[] | null;
};