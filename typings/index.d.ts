import { VoiceConnection } from "@discordjs/voice";
import { VoiceChannel } from "discord.js";

declare module "discord-voice" {
    type VoiceChannelConnectOptions = {
        group?: String,
        selfDeaf?: Boolean,
        selfMute?: Boolean
    };

    export function voiceChannelConnect(channel: VoiceChannel, options?: VoiceChannelConnectOptions): VoiceConnection;
}
