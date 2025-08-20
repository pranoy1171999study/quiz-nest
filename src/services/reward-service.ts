import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
    providedIn: 'root',
})
export class RewardService {

    constructor() { }

    /**
     * Call this method for a correct answer.
     * Shows confetti animation.
     */

    correctAnswer() {
        // return;
        const myConfetti = this.getConfettiInstance();
        const duration = 4 * 1000; // 4 seconds
        const end = Date.now() + duration;

        this.playClapSound();
        const frame = () => {
            myConfetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            });
            myConfetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });

            if (Date.now() < end) requestAnimationFrame(frame);
        };

        frame();
    }
    private getConfettiInstance() {
        const canvas = document.getElementById('custom-canvas') as HTMLCanvasElement;
        // Create the confetti instance once
        (canvas as any).confetti = (canvas as any).confetti || confetti.create(canvas, { resize: true, useWorker: true });
        return (canvas as any).confetti;
    }
    /**
     * Call this method for a wrong answer.
     * Plays buzzer sound.
     */
    wrongAnswer() {
        // return;
        this.playSound(1000,5000,'assets/sounds/wrong.mp3');
    }
    private playClapSound(startTime: number = 3000, duration: number = 4000){
        this.playSound(startTime,duration,'assets/sounds/clapping.mp3');
    }

    private playSound(startTime: number, duration: number,audioPath:string) {
        const audio = new Audio(audioPath);
        audio.currentTime = startTime / 1000;

        audio.play();

        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, duration);
    }

}
