import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const avatar = await api.getFullAvatar("123456789");
console.log(avatar);
