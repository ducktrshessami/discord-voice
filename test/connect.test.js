require("dotenv").config();
const { Client } = require("discord.js");
const { voiceChannelConnect, voiceChannelConnectSync } = require("../lib");

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
})
