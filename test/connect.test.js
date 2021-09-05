require("dotenv").config();
const { VoiceConnection, VoiceConnectionStatus, entersState } = require("@discordjs/voice");
const assert = require("assert");
const { Client } = require("discord.js");
const { voiceChannelConnectSync, voiceChannelConnect } = require("../lib");

describe("test connection functions", function () {
    let channel;
    const client = new Client({
        intents: ["GUILDS"]
    });

    before(function (done) {
        client
            .once("ready", () => {
                console.log(`Logged in as ${client.user.tag}`);
                channel = client.channels.resolve(process.env.DISCORD_CHANNEL);
                if (channel && channel.isVoice()) {
                    console.log(`Found voice channel #${channel.name}`);
                    done();
                }
                else {
                    done(new Error(`Could not find voice channel with id ${process.env.DISCORD_CHANNEL}`));
                }
            })
            .login(process.env.DISCORD_TOKEN)
            .catch(done);
    });

    after(function () {
        client.destroy();
    });

    describe("voiceChannelConnectSync", function () {
        it("returns a VoiceConnection", function () {
            let connection = voiceChannelConnectSync(channel);
            assert(connection instanceof VoiceConnection);
            connection.destroy();
        });

        it("connects properly", function () {
            let connection = voiceChannelConnectSync(channel, { selfMute: false });
            return entersState(connection, VoiceConnectionStatus.Ready, 30000)
                .then(() => connection.destroy());
        }).timeout(30000);
    });

    describe("voiceChannelConnect", function () {
        it("resolve when ready", function () {
            return voiceChannelConnect(channel, { selfMute: false })
                .then(connection => {
                    if (connection.state.status === VoiceConnectionStatus.Ready) {
                        connection.destroy();
                    }
                    else {
                        connection.destroy();
                        throw new Error("connection not ready");
                    }
                });
        }).timeout(30000);

        it("resolves in a VoiceConnection", function () {
            return voiceChannelConnect(channel)
                .then(connection => {
                    assert(connection instanceof VoiceConnection);
                    connection.destroy();
                });
        }).timeout(30000);
    });
})
