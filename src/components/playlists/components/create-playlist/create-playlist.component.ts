import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ChannelApiService } from '../../../../services/channel-api-services';
import { User } from '@supabase/supabase-js';
import { Playlist } from '../../../../core/models/channel-models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-playlist',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.css',
  standalone: true
})
export class CreatePlaylistComponent {
  channelId: string = '';
  loggedinUser: User | null = null;

  playlist: Playlist = this.getEmptyPlaylist();


  // Add to your component class
  avatarPreview: string | null = null;
  defaultAvatar = 'https://dummyimage.com/256x256/ddd/555&text=Avatar'; // or any local asset
  keywordsInput = '';

  selectedAvatarFile: File | null = null;

  constructor(private authService: AuthService, private channelService: ChannelApiService, private dialogRef: MatDialogRef<CreatePlaylistComponent>,@Inject(MAT_DIALOG_DATA) public data:string) {
    this.authService.getUser().then((user) => {
      this.loggedinUser = user;
    });
    this.channelId = data;
  }

  onAvatarSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedAvatarFile = file; 
    const reader = new FileReader();
    reader.onload = () => (this.avatarPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  applyKeywords() {
    const parts = (this.keywordsInput || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    this.playlist.keywords = Array.from(new Set(parts));
  }

  async onSubmit() {
    if(!this.channelId){
      console.error("Channel Id is not Present");
    }
    if (!this.loggedinUser) {
      console.error("User not logged in");
      return;
    }

    try {
      this.playlist.channelId = this.channelId;
      this.playlist.createdAt = new Date().toISOString();
      this.playlist.updatedAt = new Date().toISOString();

      const newPlaylist = await this.channelService.createPlaylistWithAvatar(this.playlist, this.selectedAvatarFile);

      console.log("✅ Channel created successfully:", newPlaylist);
      this.dialogRef.close(newPlaylist);

    } catch (err) {
      console.error("Unexpected error creating channel:", err);
    }
  }

  onClose() {
    this.dialogRef.close();
  }


  getEmptyPlaylist():Playlist{
    return {
    channelId: this.channelId,
    title: '',
    description: '',
    coverImageUrl: null,
    keywords: [],
    visibility: "public",
    isFeatured: false,
    isActive: true,
    quizCount: 0,
    viewCount: 0,
    position: 0,
    metadata: {

    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Playlist;
  }
}
