import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const users = await api.getMultiUsersByPhones(["+84901234567", "+84907654321"]);
console.log(users);
