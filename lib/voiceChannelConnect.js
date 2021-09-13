const { VoiceConnectionStatus, entersState } = require("@discordjs/voice");
const voiceChannelConnectSync = require("./voiceChannelConnectSync");

function voiceChannelConnect(channel, options) {
    return new Promise((resolve, reject) => {
        let errors = [];
        let timeout = options?.timeout || 5000;
        let connection = voiceChannelConnectSync(channel, options);

        function handleError(error) {
            errors.push(error);
        }

        connection.on("error", handleError);
        entersState(connection, VoiceConnectionStatus.Ready, timeout)
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
    });
}

module.exports = voiceChannelConnect;
