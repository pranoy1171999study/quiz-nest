import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { generateRandomUUID } from '../../services/utils';
import { MediaType, QuestionType } from '../../core/models/enums';
import { BaseQuestion, McqQuestion, MsqQuestion, QuizQuestion, TrueFalseQuestion } from '../../core/models/question-models';
import { BaseMedia, HtmlMedia, ImageMedia, LatexMedia, MediaItem, VideoMedia, YouTubeMedia } from '../../core/models/media-models';
@Injectable({
  providedIn: 'root',
})
export class QuizHelperService {
  constructor(private sanitizer: DomSanitizer) {

  }
  createDummyQuestion(type: QuestionType): QuizQuestion {
    switch (type) {
      case QuestionType.MCQ:
        return this.createDummyMcqQuestion();

      case QuestionType.MSQ:
        return this.createDummyMsqQuestion();

      case QuestionType.TrueFalse:
        return this.createDummyTrueFalseQuestion();

      default:
        throw new Error(`Unsupported QuestionType: ${type}`);
    }
  }

  createDummyMcqQuestion(): McqQuestion {
    return {
      id: generateRandomUUID(),
      type: QuestionType.MCQ,
      questionText: '',
      media: null,
      options: [
        { id: 'A', media:null },
        { id: 'B', media:null },
        { id: 'C', media:null },
        { id: 'D', media:null }
      ],
      correctOptionId: 'A',
      marks: 1,
      maxTimeSec: -1,
      mediaDisplayTimeSec: -1
    };
  }

  createDummyMsqQuestion(): MsqQuestion {
    return {
      id: generateRandomUUID(),
      type: QuestionType.MSQ,
      questionText: '',
      media: null,
      options: [
        { id: 'A', media:null },
        { id: 'B', media:null },
        { id: 'C', media:null },
        { id: 'D', media:null }
      ],
      correctOptionIds: ['A'],
      marks: 1,
      maxTimeSec: -1,
      mediaDisplayTimeSec: -1
    };
  }

  createDummyTrueFalseQuestion(): TrueFalseQuestion {
    return {
      id: generateRandomUUID(),
      type: QuestionType.TrueFalse,
      media: null,
      questionText: '',
      correctAnswer: true,
      marks: 1,
      maxTimeSec: -1,
      mediaDisplayTimeSec: -1
    };
  }

  getOriginalQuestionFormat(question: BaseQuestion | null): QuizQuestion | null {
    if (!question) {
      return null;
    }
    switch (question.type) {
      case QuestionType.MCQ:
        return question as McqQuestion;
      case QuestionType.MSQ:
        return question as MsqQuestion;
      case QuestionType.TrueFalse:
        return question as TrueFalseQuestion;
      default:
        return null;
    }
  }
  getOriginalMediaFormat(media: BaseMedia | MediaItem | null): MediaItem | null {
    if (!media) {
      return null;
    }
    switch (media.type) {
      case MediaType.IMAGE:
        return media as ImageMedia;
      case MediaType.HTML:
        return media as HtmlMedia;
      case MediaType.VIDEO:
        return media as VideoMedia;
      case MediaType.YOUTUBE:
        return media as YouTubeMedia;
      case MediaType.LATEX:
        return media as LatexMedia;
      default:
        return null;
    }
  }


  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  };
  getSafeUrlForYoutube(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  };

  extractYoutubeVideoId(url: string): string {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&?/]+)/
    );
    return match && match[1] ? match[1] : '';
  }
}


