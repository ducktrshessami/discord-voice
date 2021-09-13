const { getVoiceConnection } = require("@discordjs/voice");
const { Guild } = require("discord.js");

Object.defineProperty(Guild.prototype, "voiceConnection", {
    get: function () {
        return getVoiceConnection(this.id);
    }
});
