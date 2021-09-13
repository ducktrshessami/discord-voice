import { VoiceConnection } from "@discordjs/voice";
import { VoiceChannel } from "discord.js";

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

declare module "discord-voice" {
    export function voiceChannelConnectSync(channel: VoiceChannel, options?: VoiceChannelConnectSyncOptions): VoiceConnection;
    export function voiceChannelConnect(channel: VoiceChannel, options?: VoiceChannelConnectOptions): Promise<VoiceConnection>;
}

declare module "discord.js" {
    interface VoiceChannel {
        connect(options?: VoiceChannelConnectOptions): Promise<VoiceConnection>;
    }

    interface Guild {
        public readonly voiceConnection?: VoiceConnection;
    }
}
