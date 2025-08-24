import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient';
import { camelToSnake, removeNulls, snakeToCamel } from './utils';
import { Channel, Playlist } from '../core/models/channel-models';
import { AuthService } from '../components/auth/auth.service';
import { User } from '@supabase/supabase-js';
import { FileCompressService } from './file-compress.service';

@Injectable({
    providedIn: 'root',
})
export class ChannelApiService {
    loggedInUser: User | null = null;

    constructor(private authService: AuthService, private fileCompressionService: FileCompressService) {
        this.getLoggedinUser();
    }
    async getLoggedinUser() {
        const loggedinUser = await this.authService.getUser();
        this.loggedInUser = loggedinUser;
    }

    async createChannelWithAvatar(channel: Channel, avatarFile: File | null) {
        // 1️⃣ Create channel
        const { data: newChannel, error: createError } = await this.createChannel(channel);
        if (createError || !newChannel) throw createError;

        // 2️⃣ Upload avatar
        if (!avatarFile) {
            console.log("Avatar file is not there");
        }
        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const filePath = `${this.loggedInUser?.id}/channel/${newChannel.id}/channel-icon.${fileExt}`
            const compressedFile = await this.fileCompressionService.compressImage(avatarFile, 100, 512);
            const avatarUrl = await this.uploadAvatar(compressedFile, filePath);
            if (avatarUrl) {
                const { data: updatedChannel, error: updateError } =
                    await this.updateChannel({ ...newChannel, profilePictureUrl: avatarUrl });
                if (updateError) throw updateError;
                return updatedChannel;
            }
        }

        return newChannel;
    }
    async updateChannelWithAvatar(channel: Channel, avatarFile: File | null) {
        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const filePath = `${this.loggedInUser?.id}/channel/${channel.id}/channel-icon.${fileExt}`;
            const compressedFile = await this.fileCompressionService.compressImage(
                avatarFile,
                100,
                512
            );
            const avatarUrl = await this.uploadAvatar(compressedFile, filePath);
            if (avatarUrl) {
                channel.profilePictureUrl = avatarUrl;
            }
        }

        // 2️⃣ update channel in DB
        this.updateChannel(channel);
    }

    private async createChannel(channel: Channel) {
        return await supabase.from('channels').insert(camelToSnake(removeNulls(channel))).select().single();
    }
    private async updateChannel(channel: Channel) {
        const { id, ...updatePayload } = channel;
        return await supabase
            .from('channels')
            .update(camelToSnake(updatePayload))
            .eq('id', id)
            .select();
    }


    async getChannels(): Promise<Channel[]> {
        const { data, error } = await supabase
            .from('channels')
            .select('*');

        if (error) {
            console.error('Error fetching channels:', error.message);
            throw error;
        }
        return snakeToCamel(data) as Channel[];
    }
    async getChannelsForUser(userId: string): Promise<Channel[]> {
        const { data, error } = await supabase
            .from('channels')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching channels:', error.message);
            throw error;
        }
        return snakeToCamel(data) as Channel[];
    }
    async isHandleAvailable(handle: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('channels')
            .select('id')
            .eq('handle', handle)
            .maybeSingle();

        if (error) {
            console.error('Handle check failed', error);
            return false;
        }
        return !data;
    }












    /**
     *```````````````````````````````Playlist Section~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */

    async getPlaylistsByChannel(channelId: string): Promise<Playlist[]> {
        const { data, error } = await supabase
            .from('playlists')
            .select('*')
            .eq('channel_id', channelId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching playlists:', error.message);
            throw error;
        }
        return snakeToCamel(data) as Playlist[];
    }
    private async createPlaylist(playlist: Playlist) {
        return await supabase.from('playlists').insert(camelToSnake(removeNulls(playlist))).select().single();
    }
    private async updatePlaylist(playlist: Playlist) {
        const { id, ...updatePayload } = playlist;
        return await supabase
            .from('playlists')
            .update(camelToSnake(updatePayload))
            .eq('id', id)
            .select();
    }
    async createPlaylistWithAvatar(playlist: Playlist, avatarFile: File | null) {
        // 1️⃣ Create playlist
        const { data: newPlaylist, error: createError } = await this.createPlaylist(playlist);
        if (createError || !newPlaylist) throw createError;

        // 2️⃣ Upload avatar
        if (!avatarFile) {
            console.log("Avatar file is not there");
        }
        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const filePath = `${this.loggedInUser?.id}/channel/${playlist?.channelId}/playlist/${newPlaylist.id}.${fileExt}`
            const compressedFile = await this.fileCompressionService.compressImage(avatarFile, 100, 512);
            const avatarUrl = await this.uploadAvatar(compressedFile, filePath);
            if (avatarUrl) {
                const { data: updatedPlaylist, error: updateError } =
                    await this.updatePlaylist({ ...newPlaylist, coverImageUrl: avatarUrl });
                if (updateError) throw updateError;
                return updatedPlaylist;
            }
        }

        return newPlaylist;
    }
    async updatePlaylistWithAvatar(playlist: Playlist, avatarFile: File | null) {
        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const filePath = `${this.loggedInUser?.id}/channel/${playlist?.channelId}/playlist/${playlist.id}.${fileExt}`
            const compressedFile = await this.fileCompressionService.compressImage(
                avatarFile,
                100,
                512
            );
            const avatarUrl = await this.uploadAvatar(compressedFile, filePath);
            if (avatarUrl) {
                playlist.coverImageUrl = avatarUrl;
            }
        }

        // 2️⃣ update pplaylist in DB
        this.updatePlaylist(playlist);
    }

    async deletePlaylist(playlistId: string, coverImageUrl: string | null | undefined) {
        // 1. Delete DB row
        const { error: dbError } = await supabase
            .from('playlists')
            .delete()
            .eq('id', playlistId);

        if (dbError) {
            console.error('Error deleting playlist:', dbError.message);
            throw dbError;
        }

        // 2. Delete cover image if URL exists
        if (coverImageUrl && coverImageUrl !== null && coverImageUrl !== undefined) {
            const filePath = getStoragePathFromUrl(coverImageUrl);

            if (filePath) {
                const { error: storageError } = await supabase.storage
                    .from('avatars-store')
                    .remove([filePath]);

                if (storageError) {
                    console.error('Error deleting cover image:', storageError.message);
                    throw storageError;
                }
            }
        }
        function getStoragePathFromUrl(publicUrl: string): string {
            const parts = publicUrl.split("/object/public/avatars-store/");
            return parts[1] || "";
        }

    }












    async uploadAvatar(file: File, filePath: string): Promise<string | null> {
        console.log("Upload avatar triggered");

        const { error: uploadError } = await supabase
            .storage
            .from('avatars-store')
            .upload(filePath, file, {
                upsert: true,
                contentType: file.type,
            });

        if (uploadError) {
            console.error("Error uploading avatar:", uploadError.message);
            return null;
        }

        // Return public URL
        const { data: publicUrl } = supabase
            .storage
            .from('avatars-store')
            .getPublicUrl(filePath);

        return publicUrl?.publicUrl || null;
    }

}