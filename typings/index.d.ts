import Voice, { AudioResource, NoSubscriberBehavior, PlayerSubscription, StreamType, VoiceConnection } from "@discordjs/voice";
import { StageChannel, VoiceChannel } from "discord.js";

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
    function voiceChannelConnectSync(channel: VoiceChannel | StageChannel, options?: VoiceChannelConnectSyncOptions): VoiceConnection;
    function voiceChannelConnect(channel: VoiceChannel | StageChannel, options?: VoiceChannelConnectOptions): Promise<VoiceConnection>;
    function voiceConnectionPlay<T>(connection: VoiceConnection, input: String | ReadableStream | AudioResource<T>, options?: VoiceConnectionPlayOptions<T>): [PlayerSubscription, AudioResource<T>];

    export {
        Voice,
        voiceChannelConnectSync,
        voiceChannelConnect,
        voiceConnectionPlay
    };
}

declare module "discord.js" {
    interface BaseGuildVoiceChannel {
        connect(options?: VoiceChannelConnectOptions): Promise<VoiceConnection>;
        connectSync(options?: VoiceChannelConnectSyncOptions): VoiceConnection;
    }

    interface Guild {
        readonly voiceConnection?: VoiceConnection;
    }
}

declare module "@discordjs/voice" {
    interface VoiceConnection {
        play<T>(input: String | ReadableStream | AudioResource<T>, options?: VoiceConnectionPlayOptions<T>): [PlayerSubscription, AudioResource<T>];
    }
}
