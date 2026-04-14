import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const status = await api.getFriendOnlines();
console.log(status);
