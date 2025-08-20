import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameQuizComponent } from "../components/quiz-renderer/game-quiz/game-quiz.component";
import { PracticeSetQuizComponent } from "../components/quiz-renderer/practice-set-quiz/practice-set-quiz.component";
import { GameQuiz, PracticeSetQuiz, QuizItem } from '../../../core/models/quiz-models';
import { QuizType } from '../../../core/models/enums';

@Component({
  selector: 'app-quiz-view-home',
  imports: [CommonModule, GameQuizComponent, PracticeSetQuizComponent],
  templateUrl: './quiz-view-home.component.html',
  styleUrl: './quiz-view-home.component.css',
  standalone: true
})
export class QuizViewHomeComponent {
  @ViewChild('quizViewDiv') quizViewDiv!: ElementRef<HTMLDivElement>;
  QuizType = QuizType;
  quiz: QuizItem | null = null;

  constructor() {
    const testQuiz = localStorage.getItem('quiz-testing');
    if(testQuiz){
      try{
        this.quiz = JSON.parse(testQuiz).quiz;
      }catch(error){
        console.error(error);
      }
    }else{
      this.quiz = this.getSampleQuiz()
    }
  }

  getGameQuiz(): GameQuiz {
    return this.quiz as GameQuiz;
  }
  getPracticeSetQuiz(): PracticeSetQuiz {
    return this.quiz as PracticeSetQuiz;
  }

  toggleFullScreen() {
    if (!this.quizViewDiv) {
      return;
    }
    if (!document.fullscreenElement) {
      this.quizViewDiv.nativeElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  getSampleQuiz() {
    return {
      "id": "1755107915374",
      "title": "Test Game Quiz",
      "description": "test game desc",
      "type": "GAME",
      "createdBy": "Prano1234",
      "createdAt": new Date("2025-08-14T12:00:00Z"),
      "isActive": true,
      "startingPage": {
        "id": "f62cef33-30b7-4bf1-9cd9-b024e7f27c7d",
        "type": "HTML",
        "content": "\n\n\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Quiz Instructions</title>\n<style>\n  body {\n    margin: 0;\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: #fff;\n  }\n\n  .container {\n    max-width: 900px;\n    margin: 50px auto;\n    background: rgba(0,0,0,0.75);\n    padding: 40px;\n    border-radius: 20px;\n    box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n  }\n\n  h1 {\n    text-align: center;\n    font-size: 2.5rem;\n    margin-bottom: 20px;\n    color: #ffdd57;\n    text-shadow: 2px 2px 5px rgba(0,0,0,0.5);\n  }\n\n  h2 {\n    margin-top: 30px;\n    color: #ffd700;\n  }\n\n  p {\n    font-size: 1.1rem;\n    line-height: 1.6;\n    margin-bottom: 20px;\n  }\n\n  .rules {\n    background: rgba(255, 255, 255, 0.1);\n    padding: 20px;\n    border-radius: 15px;\n  }\n\n  .rules ul {\n    list-style: none;\n    padding-left: 0;\n  }\n\n  .rules li {\n    position: relative;\n    padding-left: 25px;\n    margin-bottom: 15px;\n    font-size: 1rem;\n  }\n\n  .rules li::before {\n    content: '✔';\n    position: absolute;\n    left: 0;\n    color: #00ffcc;\n    font-weight: bold;\n  }\n\n  .tip-box {\n    background: rgba(0, 255, 204, 0.1);\n    color: #00ffcc;\n    padding: 15px;\n    border-radius: 10px;\n    margin-top: 20px;\n    font-style: italic;\n  }\n\n  .banner-ad {\n    width: 100%;\n    height: 120px;\n    background: linear-gradient(90deg, #ff6a00, #ee0979);\n    border-radius: 15px;\n    margin: 30px 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 1.2rem;\n    font-weight: bold;\n    color: #fff;\n    box-shadow: 0 5px 15px rgba(0,0,0,0.3);\n  }\n\n</style>\n\n\n\n<div class=\"container\">\n  <h1>Welcome to the Ultimate Knowledge Challenge</h1>\n\n  <p>\n    Test your skills across multiple categories including General Knowledge, Math, Science, and Logical Reasoning.\n    This interactive quiz is designed to challenge your speed and accuracy. Each question has a time limit, and\n    answers will be evaluated instantly.\n  </p>\n\n  <div class=\"banner-ad\">Your Sponsor Banner Here</div>\n\n  <h2>Game Instructions</h2>\n  <div class=\"rules\">\n    <ul>\n      <li>You will be presented with 20 multiple-choice questions.</li>\n      <li>Each question has a countdown timer. Answer before time runs out!</li>\n      <li>Some questions may show an image, video, or text media first. Observe carefully.</li>\n      <li>Skipping questions is allowed in preview mode but will count as unanswered in the final quiz.</li>\n      <li>Final answers will be recorded only when you submit or when time expires.</li>\n      <li>Refreshing the page will reset the quiz progress.</li>\n      <li>Leaderboard results will be available after quiz completion.</li>\n    </ul>\n  </div>\n\n  <div class=\"tip-box\">\n    Tip: Read all options carefully and manage your time wisely. Some media hints may help you answer faster!\n  </div>\n\n  <div class=\"banner-ad\">Your Banner Ad Here</div>\n\n  <h2>Scoring &amp; Time</h2>\n  <p>\n    Each correct answer awards points as indicated per question. Incorrect or skipped answers may carry zero points.\n    Use your time effectively to maximize your score. Remember, some questions display supporting media before the\n    main question appears.\n  </p>\n\n  <h2>Important Notes</h2>\n  <div class=\"rules\">\n    <ul>\n      <li>All responses are final after submission.</li>\n      <li>Do not attempt to inspect or modify the page – scores are tracked securely on the server.</li>\n      <li>Technical issues should be reported immediately to support.</li>\n    </ul>\n  </div>\n\n</div>\n\n\n\n"
      },
      "questions": [
        {
          "id": "d71ee4af-c361-4623-8e24-d9747206cf86",
          "questionText": "Throughout history, France has played a pivotal role in European and world affairs, being a center of culture, art, politics, and economic development. From its medieval kingdoms to the Enlightenment era, France has cultivated a unique identity that blends rich traditions with modern advancements. Among its numerous cities, one stands out as the political, cultural, and economic hub of the country, serving as the seat of government, the residence of national leaders, and the location of many historic landmarks. This city has been a focal point for intellectual movements, revolutionary activities, and international diplomacy. It is famous worldwide for its iconic architecture, including a globally recognized iron tower, grand boulevards, world-class museums, and renowned culinary experiences. The city is also a major center for fashion, education, and finance, attracting millions of tourists and professionals every year. In addition to its historical and cultural significance, this city has consistently played a role in shaping modern European policies and maintaining France’s influence in global affairs. Given its historical importance, economic prominence, and cultural impact, it is often one of the first cities people associate with France when thinking about travel, art, and governance.\n\nQuestion: Considering all the historical, political, and cultural significance described above, what is the capital city of France?",
          "type": "MCQ",
          "marks": 1,
          "maxTimeSec": 600,
          "mediaDisplayTimeSec": 10,
          "options": [
            {
              "id": "a1",
              "media": {
                "id": "17996911-ef5a-409b-b61f-6f72e39ceb4b",
                "type": "HTML",
                "content": "gvjhbkjnlk"
              }
            },
            {
              "id": "a2",
              "media": {
                "id": "6b9fce2d-b83d-4c19-acd1-c1fa1a5ca745",
                "type": "LATEX",
                "content": "standalone: true"
              }
            },
            {
              "id": "a3",
              "media": {
                "id": "0924cf1d-23f1-4454-9714-72e4c54a7ac2",
                "name": "Wildflowers",
                "type": "IMAGE",
                "url": "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
                "altText": "field of wildflowers"
              }
            },
            {
              "id": "a4",
              "media": {
                "id": "3fadbf55-3bb1-4fe4-9a83-f74a0cb3bc95",
                "type": "HTML",
                "content": "<div><span>standalone</span><span>:</span> <span>true</span></div>"
              }
            }
          ],
          "correctOptionId": "a1",
          "media": {
            "id": "3755de5d-d655-4d65-92b4-dcab8d2ffb18",
            "name": "Desert Dunes",
            "type": "IMAGE",
            "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            "altText": "sand dunes in the desert"
          }
        },
        {
          "id": "c668e1f4-1702-4a2f-835d-48994c9b5a23",
          "questionText": "",
          "type": "MCQ",
          "marks": 1,
          "maxTimeSec": 600,
          "mediaDisplayTimeSec": 10,
          "options": [
            {
              "id": "a1",
              "media": {
                "id": "5c08e839-f782-472a-aa28-d5656f18efd2",
                "name": "Beautiful Mountains",
                "type": "IMAGE",
                "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
                "altText": "snow-covered mountains"
              }
            },
            {
              "id": "a2",
              "media": {
                "id": "92f1bce5-e145-4ca3-a380-e680c44e9fc8",
                "type": "HTML",
                "content": "<div><span>standalone</span><span>:</span> <span>true</span></div>"
              }
            },
            {
              "id": "a3",
              "media": {
                "id": "810f3866-2a50-4aa3-bfa3-b99537f8f754",
                "type": "HTML",
                "content": "<div><span>standalone</span><span>:</span> <span>true</span></div>"
              }
            },
            {
              "id": "a4",
              "media": {
                "id": "b029bb2f-488f-4596-b0eb-42910dc33c33",
                "type": "HTML",
                "content": "<div><span>standalone</span><span>:</span> <span>true</span></div>"
              }
            }
          ],
          "correctOptionId": "a1",
          "media": {
            "id": "efd3595f-3522-4335-b9b8-89539b8ab07d",
            "type": "LATEX",
            "content": "standalone:truestandalone:truestandalone:truestandalone:true"
          }
        }
      ]
    } as GameQuiz;
  }
}
