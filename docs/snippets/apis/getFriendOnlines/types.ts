export type GetFriendOnlinesStatus = {
    userId: string;
    status: string;
};

export type GetFriendOnlinesResponse = {
    predefine: string[];
    ownerStatus: string;
    onlines: GetFriendOnlinesStatus[];
};