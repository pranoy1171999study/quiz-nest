import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Playlist } from '../../../../core/models/channel-models';
import { AuthService } from '../../../auth/auth.service';
import { ChannelApiService } from '../../../../services/channel-api-services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { User } from '@supabase/supabase-js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-playlist',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-playlist.component.html',
  styleUrl: './edit-playlist.component.css',
  standalone: true
})
export class EditPlaylistComponent {
  loggedinUser: User | null = null;

  playlist: Playlist;

  avatarPreview: string | null = null;
  defaultAvatar = 'https://dummyimage.com/256x256/ddd/555&text=Avatar'; // or any local asset
  keywordsInput = '';

  selectedAvatarFile: File | null = null;

  constructor(private authService: AuthService, private channelService: ChannelApiService, private dialogRef: MatDialogRef<CreatePlaylistComponent>, @Inject(MAT_DIALOG_DATA) public data: Playlist) {
    this.authService.getUser().then((user) => {
      this.loggedinUser = user;
    });
    this.playlist = data;
  }
  ngOnInit() {
    this.keywordsInput = this.playlist?.keywords?.length
      ? this.playlist.keywords.join(',')
      : '';
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
    if (!this.loggedinUser) {
      console.error("User not logged in");
      return;
    }

    try {
      this.playlist.createdAt = new Date().toISOString();
      this.playlist.updatedAt = new Date().toISOString();

      const newPlaylist = await this.channelService.updatePlaylistWithAvatar(this.playlist, this.selectedAvatarFile);

      console.log("✅ Channel updated successfully:", newPlaylist);
      this.dialogRef.close(newPlaylist);

    } catch (err) {
      console.error("Unexpected error creating channel:", err);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
