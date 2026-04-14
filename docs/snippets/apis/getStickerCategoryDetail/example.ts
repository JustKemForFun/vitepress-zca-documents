import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const stickers = await api.getStickerCategoryDetail(1);
console.log(stickers);
