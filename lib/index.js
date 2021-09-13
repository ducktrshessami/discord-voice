const Voice = require("@discordjs/voice");
const voiceChannelConnectSync = require("./voiceChannelConnectSync");
const voiceChannelConnect = require("./voiceChannelConnect");

const API = {
    Voice,
    voiceChannelConnectSync,
    voiceChannelConnect
};

require("./proto");

module.exports = API;
