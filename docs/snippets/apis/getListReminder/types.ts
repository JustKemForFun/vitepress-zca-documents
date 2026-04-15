export type ListReminderOptions = {
    /**
     * Mặc định 1
     */
    page?: number;
    /**
     * Mặc định 20
     */
    count?: number;
};

export type ReminderListUser = ReminderUser;
export type ReminderListGroup = ReminderGroup & {
    groupId: string;
    eventType: number;
    responseMem: {
        rejectMember: number;
        myResp: number;
        acceptMember: number;
    };
    repeatInfo: {
        list_ts: unknown[];
    };
    repeatData: unknown[];
};

export type GetListReminderResponse = (ReminderListUser & ReminderListGroup)[];