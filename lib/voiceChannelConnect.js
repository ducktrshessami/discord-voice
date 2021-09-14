const { VoiceConnectionStatus } = require("@discordjs/voice");
const { Intents } = require("discord.js");
const voiceChannelConnectSync = require("./voiceChannelConnectSync");

function voiceChannelConnect(channel, options) {
    return new Promise((resolve, reject) => {
        if (channel.client.options.intents & Intents.FLAGS.GUILD_VOICE_STATES) {
            let errors = [];
            let timeout = options?.timeout || 5000;
            let connection = voiceChannelConnectSync(channel, options);

            function handleError(error) {
                errors.push(error);
            }

            connection
                .on("error", handleError)
                .entersState(VoiceConnectionStatus.Ready, timeout)
                .then(() => {
                    connection.off("error", handleError);
                    resolve(connection);
                })
                .catch(() => {
                    let thrown;
                    if (errors.length) {
                        thrown = errors[0];
                    }
                    else {
                        thrown = new Error("Connection timed out");
                        thrown.name = "VoiceChannelConnectError";
                    }
                    connection.off("error", handleError);
                    connection.destroy();
                    reject(thrown);
                });
        }
        else {
            let thrown = new Error("Client lacks intent GUILD_VOICE_STATES");
            thrown.name = "VoiceChannelConnectError";
            reject(thrown);
        }
    });
}

module.exports = voiceChannelConnect;
