const { joinVoiceChannel } = require("@discordjs/voice");

function voiceChannelConnectSync(channel, options) {
    let connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        ...options
    });
    Object.defineProperties(connection, {
        client: { value: channel.client },
        channel: {
            value: channel,
            enumerable: true
        },
        channelId: {
            value: channel.id,
            enumerable: true
        },
        guild: {
            value: channel.guild,
            enumerable: true
        },
        guildId: {
            value: channel.guild.id,
            enumerable: true
        }
    });
    return connection;
}

module.exports = voiceChannelConnectSync;
