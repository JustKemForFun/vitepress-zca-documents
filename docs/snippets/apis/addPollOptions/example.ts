import { Zalo } from "zca-js";

const zalo = new Zalo();
const api = await zalo.loginQR();

// Add options to an existing poll
await api.addPollOptions({
    pollId: 123,
    options: [{ voted: false, content: "Option mới" }],
    votedOptionIds: [],
});
