import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const res = await api.updateActiveStatus(true);
console.log(res.status);
