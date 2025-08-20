import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  readonly ToolTip = {
    quiz_type: `
    <div class="space-y-4">
      <div>
        <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-100">Game</h3>
        <p class="text-gray-600 dark:text-gray-300">
          An interactive, fast-paced quiz format where participants compete in real time.
          Ideal for fun learning sessions, team engagement, or classroom activities.
          Players answer questions live, and points are awarded instantly, creating an
          energetic and engaging environment.
        </p>
      </div>
      <div>
        <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-100">Practice Set</h3>
        <p class="text-gray-600 dark:text-gray-300">
          A structured, exam-oriented quiz format designed for focused preparation.
          Perfect for mock tests, competitive exam practice (e.g., government exams,
          corporate assessments, or certification tests), and skill evaluation.
          Participants can review answers, track progress, and improve performance over time.
        </p>
      </div>
    </div>
  `,
    quiz_start_date: `
      <div class="space-y-2">
        <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-100">Opens On</h3>
        <p class="text-gray-600 dark:text-gray-300">
          The date and time when the quiz will become available for participants to join or attempt.
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          Set this to control when your quiz opens for access.
        </p>
      </div>
    `,
    quiz_expiry_date: `
      <div class="space-y-2">
        <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-100"> Closes For New Starts</h3>
        <p class="text-gray-600 dark:text-gray-300">
          The date and time after which the quiz will no longer be accessible to participants.
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          Leave this unset if you want the quiz to remain available indefinitely, such as for practice sets.
        </p>
      </div>
    `
  };

}


