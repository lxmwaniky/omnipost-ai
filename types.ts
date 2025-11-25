export enum Tone {
  PROFESSIONAL = 'Professional',
  WITTY = 'Witty',
  URGENT = 'Urgent',
  CASUAL = 'Casual',
  INSPIRATIONAL = 'Inspirational',
  EMPATHETIC = 'Empathetic',
  LUXURY = 'Luxury',
  MINIMALIST = 'Minimalist',
  BOLD = 'Bold',
  STORYTELLING = 'Storytelling'
}

export enum Platform {
  LINKEDIN = 'LinkedIn',
  TWITTER = 'X',
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  PINTEREST = 'Pinterest',
  VIDEO = 'Video Reels'
}

export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K'
}

export enum AspectRatio {
  AUTO = 'Auto',
  SQUARE = '1:1',
  PORTRAIT = '3:4',
  LANDSCAPE = '4:3',
  WIDE = '16:9',
  TALL = '9:16'
}

export interface SocialPost {
  platform: Platform;
  content: string;
  hashtags: string[];
  imageUrls?: string[];
  imagePrompt?: string;
  aspectRatio: string;
}

export interface VideoPost {
  url: string;
  prompt: string;
  content?: string;
}

export interface GeneratedContent {
  linkedin?: SocialPost;
  twitter?: SocialPost;
  instagram?: SocialPost;
  facebook?: SocialPost;
  pinterest?: SocialPost;
  video?: VideoPost;
}

export interface GenerationConfig {
  imageSize: ImageSize;
  forcedAspectRatio: AspectRatio; 
}