export type AddReactionResponse = {
    msgIds: number[];
};

export type CustomReaction = {
    rType: number;
    source: number;
    icon: string;
};

export type AddReactionDestination = {
    data: {
        msgId: string;
        cliMsgId: string;
    };
    threadId: string;
    type: ThreadType;
};