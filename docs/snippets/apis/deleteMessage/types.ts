export type DeleteMessageResponse = {
    status: number;
};

export type DeleteMessageDestination = {
    data: {
        cliMsgId: string;
        msgId: string;
        uidFrom: string;
    };
    threadId: string;
    /**
     * mặc định ThreadType.User
     */
    type?: ThreadType;
};