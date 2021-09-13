const { VoiceChannel } = require("discord.js");
const voiceChannelConnect = require("../voiceChannelConnect");
const voiceChannelConnectSync = require("../voiceChannelConnectSync");

VoiceChannel.prototype.connect = function (options) {
    return voiceChannelConnect(this, options);
};

VoiceChannel.prototype.connectSync = function (options) {
    return voiceChannelConnectSync(this, options);
}
