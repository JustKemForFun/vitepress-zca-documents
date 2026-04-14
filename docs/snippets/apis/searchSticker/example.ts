import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const stickers = await api.searchSticker("hello", 10);
console.log(stickers);
