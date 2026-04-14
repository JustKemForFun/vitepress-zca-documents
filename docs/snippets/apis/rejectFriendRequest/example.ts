import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

await api.rejectFriendRequest("123456789");
