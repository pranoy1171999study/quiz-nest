import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient';
import { camelToSnake, removeNulls, snakeToCamel } from './utils';
import { Channel } from '../core/models/channel-models';

@Injectable({
    providedIn: 'root',
})
export class ChannelApiService {

    async createChannel(channel: Channel) {
        return await supabase.from('channels').insert(camelToSnake(removeNulls(channel))).select().single();
    }
    async updateChannel(channel: Channel) {
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

}