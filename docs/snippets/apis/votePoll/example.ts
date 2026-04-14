import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const res = await api.votePoll(123, 1);
console.log(res.options);
