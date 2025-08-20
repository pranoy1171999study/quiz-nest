import { QuizType } from "./enums";
import { MediaItem, HtmlMedia } from "./media-models";
import { QuizQuestion } from "./question-models";

export interface BaseQuiz {
  id: string;
  title: string;           
  description?: string;  
  startingPage:HtmlMedia|null;  
  type: QuizType;         
  createdBy: string;       
  createdAt: Date;         
  updatedAt?: Date;        
  startDate?: Date;        
  expiryDate?: Date;       
  isActive: boolean;  
  keywords?:string[];
  thumbnailUrl?:string;     
}

export interface GameQuiz extends BaseQuiz {
    type:QuizType.GAME,
    questions:QuizQuestion[]
}
export interface PracticeSetQuiz extends BaseQuiz {
    type:QuizType.PRACTICE_SET,
    sections:QuizSection[]
}

export interface QuizSection {
  id: string;                        
  title: string;                     
  description?: string;              
  disclaimer?: HtmlMedia|null;        
  timeLimitMinutes?: number;
  questions:QuizQuestion[]
}

export type QuizItem = GameQuiz | PracticeSetQuiz;
