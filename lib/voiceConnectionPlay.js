const { createAudioPlayer, AudioResource, createAudioResource } = require("@discordjs/voice");

function voiceConnectionPlay(connection, input, options) {
    let player = createAudioPlayer(options);
    let resource = input instanceof AudioResource ? input : createAudioResource(input, options);
    let subscription = connection.subscribe(player);
    player.play(resource);
    return [subscription, resource];
}

module.exports = voiceConnectionPlay;
