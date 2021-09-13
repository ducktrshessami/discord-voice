const voiceChannelConnectSync = require("./voiceChannelConnectSync");
const voiceChannelConnect = require("./voiceChannelConnect");

const API = {
    voiceChannelConnectSync,
    voiceChannelConnect
};

require("./channelProto");

module.exports = API;
