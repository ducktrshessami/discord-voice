const { VoiceConnectionStatus, entersState } = require("@discordjs/voice");
const voiceChannelConnectSync = require("./voiceChannelConnectSync");

function voiceChannelConnect(channel, options) {
    return new Promise((resolve, reject) => {
        let errors = [];
        let timeout = options.timeout || 5000;
        let connection = voiceChannelConnectSync(channel, options);

        connection
            .on("error", handleError)
            .on(VoiceConnectionStatus.Disconnected, handleDisconnect)
            .once(VoiceConnectionStatus.Ready, () => handleReady);

        function handleError(error) {
            errors.push(error);
        }

        function handleDisconnect() {
            Promise.race([
                entersState(connection, VoiceConnectionStatus.Signalling, timeout),
                entersState(connection, VoiceConnectionStatus.Connecting, timeout),
                entersState(connection, VoiceConnectionStatus.Ready, timeout)
            ])
                .catch(() => {
                    let thrown;
                    if (errors.length) {
                        thrown = errors[0];
                    }
                    else {
                        thrown = new Error("Connection timed out");
                        thrown.name = "VoiceChannelConnectError";
                    }
                    offEverything();
                    connection.destroy();
                    reject(thrown);
                });
        }

        function handleReady() {
            offEverything();
            resolve(connection);
        }

        function offEverything() {
            return connection
                .off("error", handleError)
                .off(VoiceConnectionStatus.Disconnected, handleDisconnect)
                .off(VoiceConnectionStatus.Ready, handleReady);
        }
    });
}

module.exports = voiceChannelConnect;
