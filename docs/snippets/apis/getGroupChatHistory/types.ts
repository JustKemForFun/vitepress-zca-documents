export type GetGroupChatHistoryResponse = {
    lastActionId: string;
    lastActionIdOther: string;
    more: number;
    groupMsgs: GroupMessage[];
};