import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const history = await api.getGroupChatHistory("123456789", 20);
console.log(history.groupMsgs);
