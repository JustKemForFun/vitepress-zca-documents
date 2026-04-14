import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const user = await api.findUserByUsername("some.username");
console.log(user);
