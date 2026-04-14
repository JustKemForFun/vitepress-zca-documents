import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

const avatars = await api.getAvatarUrlProfile(["123456789", "987654321"]);
console.log(avatars);
