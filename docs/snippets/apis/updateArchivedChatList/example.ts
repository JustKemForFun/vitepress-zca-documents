import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

// Update archived conversations
await api.updateArchivedChatList(true, { id: "123456789", type: 0 as any });
// Note: type is ThreadType (User/Group)
