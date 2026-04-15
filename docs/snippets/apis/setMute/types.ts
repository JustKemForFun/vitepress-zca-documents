export type SetMuteParams = {
    /**
     * Thời gian tắt âm cuộc trò chuyện theo MuteDuration hoặc số (giây)
     */
    duration?: MuteDuration | number;
    action?: MuteAction;
};

export type SetMuteResponse = "";

export enum MuteDuration {
    ONE_HOUR = 3600,
    FOUR_HOURS = 14400,
    FOREVER = -1,
    UNTIL_8AM = "until8AM",
};

export enum MuteAction {
    MUTE = 1,
    UNMUTE = 3,
};