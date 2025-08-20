import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient';
import { snakeToCamel } from './utils';
import { Channel } from '../core/models/channel-models';

@Injectable({
    providedIn: 'root',
})
export class ChannelApiService {

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

}