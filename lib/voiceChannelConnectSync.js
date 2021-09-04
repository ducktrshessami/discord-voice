const { joinVoiceChannel } = require("@discordjs/voice");

function voiceChannelConnectSync(channel, options) {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        ...options
    });
}

module.exports = voiceChannelConnectSync;
