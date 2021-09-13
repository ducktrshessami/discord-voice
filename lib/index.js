const voiceChannelConnectSync = require("./voiceChannelConnectSync");
const voiceChannelConnect = require("./voiceChannelConnect");

const API = {
    voiceChannelConnectSync,
    voiceChannelConnect
};

require("./proto");

module.exports = API;
