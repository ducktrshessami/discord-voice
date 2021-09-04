import { VoiceConnection } from "@discordjs/voice";
import { VoiceChannel } from "discord.js";

declare module "discord-voice" {
    type VoiceChannelConnectSyncOptions = {
        group?: String,
        selfDeaf?: Boolean,
        selfMute?: Boolean
    };

    type VoiceChannelConnectOptions = {
        group?: String,
        selfDeaf?: Boolean,
        selfMute?: Boolean,
        timeout?: Number
    };

    export function voiceChannelConnectSync(channel: VoiceChannel, options?: VoiceChannelConnectSyncOptions): VoiceConnection;
    export function voiceChannelConnect(channel: VoiceChannel, options?: VoiceChannelConnectSyncOptions): Promise<VoiceConnection>;
}
