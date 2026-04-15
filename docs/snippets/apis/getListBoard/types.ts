export type ListBoardOptions = {
    /**
     * Mặc định 1
     */
    page?: number;
    /**
     * Mặc định 20
     */
    count?: number;
};

export type BoardItem = {
    boardType: BoardType;
    data: PollDetail | NoteDetail | PinnedMessageDetail;
};

export type GetListBoardResponse = {
    items: BoardItem[];
    count: number;
};