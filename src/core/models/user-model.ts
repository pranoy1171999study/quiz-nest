export interface User {
  id: string;                        // UUID
  email: string;
  passwordHash?: string | null;     // optional because OAuth won't have it
  authProvider: 'local' | 'google'; // enum-like
  providerUserId?: string | null;
  fullName?: string | null;
  profilePictureUrl?: string | null;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: string;                // ISO date
  updatedAt: string;                // ISO date
  lastLoginAt?: string | null;     // ISO date
}
