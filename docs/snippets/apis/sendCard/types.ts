export type SendCardOptions = {
    userId: string;
    phoneNumber?: string;
    ttl?: number;
};

export type SendCardResponse = {
    msgId: number;
};