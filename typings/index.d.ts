import Voice, { AudioPlayerStatus, AudioResource, NoSubscriberBehavior, PlayerSubscription, StreamType, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import { Client, Guild, Snowflake, StageChannel, VoiceChannel } from "discord.js";

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
        readonly client?: Client;
        readonly channel?: VoiceChannel | StageChannel;
        readonly channelId?: Snowflake;
        readonly guild?: Guild;
        readonly guildId?: Snowflake;

        play<T>(input: String | ReadableStream | AudioResource<T>, options?: VoiceConnectionPlayOptions<T>): [PlayerSubscription, AudioResource<T>];
        entersState(status: VoiceConnectionStatus, timeoutOrSignal: Number | AbortSignal): Promise<VoiceConnection>;
    }

    interface AudioPlayer {
        entersState(status: AudioPlayerStatus, timeoutOrSignal: Number | AbortSignal): Promise<AudioPlayer>;
    }
}
