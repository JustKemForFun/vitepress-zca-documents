export type SendLinkOptions = {
    msg?: string;
    link: string;
    ttl?: number;
};

export type SendLinkResponse = {
    msgId: string;
};