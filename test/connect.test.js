require("dotenv").config();
const { VoiceConnection, VoiceConnectionStatus } = require("@discordjs/voice");
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

        it("connects properly", function (done) {
            let connection = voiceChannelConnectSync(channel);
            connection.once(VoiceConnectionStatus.Ready, () => {
                connection.destroy();
                done();
            });
        });
    });

    describe("voiceChannelConnect", function () {
        it("resolve when ready", function (done) {
            voiceChannelConnect(channel)
                .then(connection => {
                    if (connection.state.status === VoiceConnectionStatus.Ready) {
                        connection.destroy();
                        done();
                    }
                    else {
                        connection.destroy();
                        done("connection not ready");
                    }
                })
                .catch(done);
        });

        it("resolves in a VoiceConnection", function (done) {
            voiceChannelConnect(channel)
                .then(connection => assert(connection instanceof VoiceConnection))
                .catch(done);
        });
    });
})
