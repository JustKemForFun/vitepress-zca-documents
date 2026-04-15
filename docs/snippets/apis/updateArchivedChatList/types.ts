export type UpdateArchivedChatListTarget = {
    id: string;
    type: ThreadType;
};

export type UpdateArchivedChatListResponse = {
    needResync: boolean;
    version: number;
};