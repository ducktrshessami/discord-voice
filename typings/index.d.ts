import { AudioPlayer, AudioResource, NoSubscriberBehavior, StreamType, VoiceConnection } from "@discordjs/voice";
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

type VoiceConnectionPlayOptions<T> = {
    debug?: Boolean;
    behaviors?: {
        noSubscriber?: NoSubscriberBehavior;
        maxMissedFrames?: Number;
    },
    inputType?: StreamType,
    metadata?: T,
    inlineVolume?: Boolean,
    silencePaddingFrames?: Number
};

declare module "discord-voice" {
    export function voiceChannelConnectSync(channel: VoiceChannel, options?: VoiceChannelConnectSyncOptions): VoiceConnection;
    export function voiceChannelConnect(channel: VoiceChannel, options?: VoiceChannelConnectOptions): Promise<VoiceConnection>;
}

declare module "discord.js" {
    interface VoiceChannel {
        public connect(options?: VoiceChannelConnectOptions): Promise<VoiceConnection>;
    }

    interface Guild {
        public readonly voiceConnection?: VoiceConnection;
    }
}

declare module "@discordjs/voice" {
    interface VoiceConnection {
        public play<T>(input: String | ReadableStream, options?: VoiceConnectionPlayOptions<T>): [AudioPlayer, AudioResource<T>];
    }
}
