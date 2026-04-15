export type EditNoteOptions = {
    /**
     * Tiêu đề
     */
    title: string;
    /**
     * ID ghi chú
     */
    topicId: string;
    /**
     * Ghim ghi chú?, mặc định `false`
     */
    pinAct?: boolean;
};

export type EditNoteResponse = NoteDetail;