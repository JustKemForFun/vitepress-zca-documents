import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

await api.upgradeGroupToCommunity("123456789");
