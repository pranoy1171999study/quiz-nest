import { MediaType } from "./enums";

export interface BaseMedia {
  id: string;
  type: MediaType;
}

export interface HtmlMedia extends BaseMedia {
  type: MediaType.HTML;
  content: string;
}

export interface ImageMedia extends BaseMedia {
  type: MediaType.IMAGE;
  name: string;
  url: string;
  altText?: string;
}

export interface VideoMedia extends BaseMedia {
  type: MediaType.VIDEO;
  name: string;
  url: string;
  thumbnailUrl: string|null;
}

export interface YouTubeMedia extends BaseMedia {
  type: MediaType.YOUTUBE;
  videoId: string;
  url: string;
  title?: string;
  thumbnailUrl?: string;
  settings?: {
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
  };
}

export interface LatexMedia extends BaseMedia {
  type: MediaType.LATEX;
  content: string;
}


export type MediaItem = HtmlMedia | ImageMedia | VideoMedia | YouTubeMedia | LatexMedia;