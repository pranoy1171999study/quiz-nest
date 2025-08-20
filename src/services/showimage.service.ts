import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShowImageService {

    private baseFallbackUrl = 'https://placehold.co/100x100?text=';

    getInitialsImageUrl(channelName: string): string {
        return this.baseFallbackUrl + this.getInitials(channelName);
    }

    onImageErrorSetInitialImage(event: Event, channelName: string) {
        (event.target as HTMLImageElement).src = this.baseFallbackUrl + this.getInitials(channelName);
    }



    /**
     * Build fallback text (2 letters max) from the given name
     */
    private getInitials(text: string): string {
        if (!text || text.trim() === '') return 'NA';

        const words = text.trim().split(/\s+/);

        if (words.length >= 2) {
            // First letter of first + first letter of second
            return (words[0][0] + words[1][0]).toUpperCase();
        } else {
            // First 2 letters of single word
            return words[0].substring(0, 2).toUpperCase();
        }
    }
}

