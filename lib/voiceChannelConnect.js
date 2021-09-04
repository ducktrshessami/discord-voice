const { joinVoiceChannel } = require("@discordjs/voice");

function voiceChannelConnect(channel, options) {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        ...options
    });
}

module.exports = voiceChannelConnect;
