const { VoiceChannel } = require("discord.js");
const voiceChannelConnect = require("../voiceChannelConnect");

VoiceChannel.prototype.connect = function (options) {
    return voiceChannelConnect(this, options);
};
