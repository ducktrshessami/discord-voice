const { VoiceConnection } = require("@discordjs/voice");
const voiceConnectionPlay = require("../voiceConnectionPlay");

VoiceConnection.prototype.play = function (input, options) {
    return voiceConnectionPlay(this, input, options);
};
