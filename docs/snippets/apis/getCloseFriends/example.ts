import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const closeFriends = await api.getCloseFriends();
console.log(closeFriends);
