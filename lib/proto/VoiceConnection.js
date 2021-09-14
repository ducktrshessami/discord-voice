const { VoiceConnection, entersState } = require("@discordjs/voice");
const voiceConnectionPlay = require("../voiceConnectionPlay");

VoiceConnection.prototype.play = function (input, options) {
    return voiceConnectionPlay(this, input, options);
};

VoiceConnection.prototype.entersState = function (status, timeoutOrSignal) {
    return entersState(this, status, timeoutOrSignal);
};
