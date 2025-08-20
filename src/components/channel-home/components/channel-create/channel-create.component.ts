import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../../core/models/channel-models';
import { AuthService } from '../../../auth/auth.service';
import { User } from '@supabase/supabase-js';
import { FormsModule } from '@angular/forms';
import { ChannelApiService } from '../../../../services/channel-api-services';

@Component({
  selector: 'app-channel-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './channel-create.component.html',
  styleUrl: './channel-create.component.css',
  standalone: true
})
export class ChannelCreateComponent {
  loggedinUser: User | null = null;
  channel: Channel = {
    userId: this.loggedinUser?.id,
    name: "",
    description: "",
    handle: "",
    profilePictureUrl: "",
    coverImageUrl: "",
    keywords: [],
    subscriberCount: 0,
    quizCount: 0,
    viewCount: 0,

    isVerified: false,
    isActive: true,

    metadata: {

    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };


  // Add to your component class
  avatarPreview: string | null = null;
  defaultAvatar = 'https://dummyimage.com/256x256/ddd/555&text=Avatar'; // or any local asset
  keywordsInput = '';


  handleAvailable: boolean | null = null;
  checkingHandle = false;

  constructor(private authService: AuthService, private channelService: ChannelApiService) {
    this.authService.getUser().then((user) => {
      this.loggedinUser = user;
      this.channel.userId = user?.id;
    });
  }

  onAvatarSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.avatarPreview = reader.result as string);
    reader.readAsDataURL(file);
    // If you also want to upload later, keep `file` around as needed.
  }

  applyKeywords() {
    const parts = (this.keywordsInput || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    this.channel.keywords = Array.from(new Set(parts));
  }

  async onSubmit() {
    if (!this.loggedinUser) {
      console.error("User not logged in");
      return;
    }

    try {
      // update timestamps
      this.channel.createdAt = new Date().toISOString();
      this.channel.updatedAt = new Date().toISOString();

      // call service to insert
      const { data, error } = await this.channelService.createChannel(this.channel);

      if (error) {
        console.error("Error creating channel:", error.message);
        return;
      }

      console.log("Channel created successfully:", data);

      // reset form
      this.channel = {
        userId: this.loggedinUser.id,
        name: "",
        description: "",
        handle: "",
        profilePictureUrl: "",
        coverImageUrl: "",
        keywords: [],
        subscriberCount: 0,
        quizCount: 0,
        viewCount: 0,
        isVerified: false,
        isActive: true,
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.avatarPreview = null;
      this.keywordsInput = "";

      // ✅ redirect or show toast if you want
      // this.router.navigate(['/channels', data.id]);
    } catch (err) {
      console.error("Unexpected error creating channel:", err);
    }
  }

  async checkHandle() {
    if (!this.channel.handle) {
      this.handleAvailable = null;
      return;
    }
    this.checkingHandle = true;
    this.handleAvailable = await this.channelService.isHandleAvailable(this.channel.handle);
    this.checkingHandle = false;
  }

}
