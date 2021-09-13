const { BaseGuildVoiceChannel } = require("discord.js");
const voiceChannelConnect = require("../voiceChannelConnect");
const voiceChannelConnectSync = require("../voiceChannelConnectSync");

BaseGuildVoiceChannel.prototype.connect = function (options) {
    return voiceChannelConnect(this, options);
};

BaseGuildVoiceChannel.prototype.connectSync = function (options) {
    return voiceChannelConnectSync(this, options);
}
