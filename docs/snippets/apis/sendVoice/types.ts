export type SendVoiceOptions = {
    voiceUrl: string;
    /**
     * Time to live in milliseconds (default: 0)
     */
    ttl?: number;
};

export type SendVoiceResponse = {
    msgId: string;
};