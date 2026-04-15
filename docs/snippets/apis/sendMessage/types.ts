export type SendMessageResult = {
    msgId: number;
};

export type SendMessageResponse = {
    message: SendMessageResult | null;
    attachment: SendMessageResult[];
};

export type SendMessageQuote = {
    content: TMessage["content"];
    msgType: TMessage["msgType"];
    propertyExt: TMessage["propertyExt"];
    uidFrom: TMessage["uidFrom"];
    msgId: TMessage["msgId"];
    cliMsgId: TMessage["cliMsgId"];
    ts: TMessage["ts"];
    ttl: TMessage["ttl"];
};

export enum TextStyle {
    Bold = "b",
    Italic = "i",
    Underline = "u",
    StrikeThrough = "s",
    Red = "c_db342e",
    Orange = "c_f27806",
    Yellow = "c_f7b503",
    Green = "c_15a85f",
    Small = "f_13",
    Big = "f_18",
    UnorderedList = "lst_1",
    OrderedList = "lst_2",
    Indent = "ind_$",
};

export type Style = {
    start: number; // vị trí bắt đầu định dạng
    len: number; // độ dài văn bản tính từ vị trí bắt đầu
    st: Exclude<TextStyle, TextStyle.Indent>; // định dạng
} | {
    start: number; // vị trí bắt đầu định dạng
    len: number; // độ dài văn bản tính từ vị trí bắt đầu
    st: TextStyle.Indent;
    /**
     * Độ dài thực lề
     */
    indentSize?: number;
};

export enum Urgency {
    Default,
    Important,
    Urgent,
};

export type Mention = {
    /**
     * Vị trí bắt đầu chuỗi đề cập
     */
    pos: number;
    /**
     * ID người dùng được đề cập
     */
    uid: string;
    /**
     * Độ dài chuỗi đề cập
     */
    len: number;
};

export type MessageContent = {
    /**
     * Nội dung văn bản
     */
    msg: string;
    /**
     * Định dạng văn bản
     */
    styles?: Style[];
    /**
     * Mức độ quan trọng
     */
    urgency?: Urgency;
    /**
     * Tin nhắn trích dẫn (tùy chọn)
     */
    quote?: SendMessageQuote;
    /**
     * Đề cập trong tin nhắn (tùy chọn)
     */
    mentions?: Mention[];
    /**
     * Tệp đính kèm trong tin nhắn (tùy chọn)
     */
    attachments?: AttachmentSource | AttachmentSource[];
    /**
     * Thời gian tồn tại, mặc định 0 (vô hạn)
     */
    ttl?: number;
};