const { AudioPlayer, entersState } = require("@discordjs/voice");

AudioPlayer.prototype.entersState = function (status, timeoutOrSignal) {
    return entersState(this, status, timeoutOrSignal);
};
