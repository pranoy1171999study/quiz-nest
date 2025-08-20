import { MediaType, QuestionType } from "./enums";
import { BaseMedia, MediaItem } from "./media-models";
import { Option } from "./models";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  marks:number;
  maxTimeSec:number;
  mediaDisplayTimeSec:number;
}

export interface McqQuestion extends BaseQuestion {
  type: QuestionType.MCQ;
  questionText: string;
  media:MediaItem|null;
  options: Option[];
  correctOptionId: string;
}
export interface MsqQuestion extends BaseQuestion {
  type: QuestionType.MSQ;
  questionText: string;
  media:MediaItem|null;
  options: Option[];
  correctOptionIds: string[];
}
export interface TrueFalseQuestion extends BaseQuestion {
  type: QuestionType.TrueFalse;
  questionText: string;
  media:MediaItem|null;
  correctAnswer: boolean;
}

export type QuizQuestion = McqQuestion | MsqQuestion | TrueFalseQuestion;