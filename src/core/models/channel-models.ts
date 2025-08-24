export interface Channel {
  id?: string; // uuid
  userId?: string | null; // references users.id

  name: string;
  description?: string | null;
  handle?: string | null;

  profilePictureUrl?: string | null;
  coverImageUrl?: string | null;

  keywords: string[];

  subscriberCount: number; // bigint
  quizCount: number;      // bigint
  viewCount: number;       // bigint

  isVerified: boolean;
  isActive: boolean;

  metadata: Record<string, any>;

  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface Playlist {
  id?: string; // uuid
  channelId: string; // references channels.id

  title: string;
  description?: string | null;
  coverImageUrl?: string | null;

  keywords: string[];

  visibility: "public" | "private" | "unlisted"; // defaults to 'public'
  isFeatured: boolean;
  isActive: boolean;

  quizCount: number;
  viewCount: number; 

  position?: number | null;

  metadata: Record<string, any>;

  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

