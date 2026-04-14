import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const settings = await api.getSettings();
console.log(settings);
