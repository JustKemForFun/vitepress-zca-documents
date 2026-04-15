import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

// Cập nhật trạng thái lưu trữ hội thoại
await api.updateArchivedChatList(true, { id: "123456789", type: 0 as any });
// Lưu ý: type là ThreadType (User/Group)
