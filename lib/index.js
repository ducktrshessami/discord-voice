const Voice = require("@discordjs/voice");
const voiceChannelConnectSync = require("./voiceChannelConnectSync");
const voiceChannelConnect = require("./voiceChannelConnect");
const voiceConnectionPlay = require("./voiceConnectionPlay");

const API = {
    Voice,
    voiceChannelConnectSync,
    voiceChannelConnect,
    voiceConnectionPlay
};

require("./proto");

module.exports = API;
