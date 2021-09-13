const { VoiceConnection, createAudioResource, AudioResource, createAudioPlayer } = require("@discordjs/voice");

VoiceConnection.prototype.play = function (input, options) {
    let player = createAudioPlayer(options);
    let resource = input instanceof AudioResource ? input : createAudioResource(input, options);
    this.subscribe(player);
    player.play(resource);
    return [player, resource];
};
