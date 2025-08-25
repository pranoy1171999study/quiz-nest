import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../../../auth/auth.service';
import { ShowImageService } from '../../../../../../../services/showimage.service';

@Component({
  selector: 'app-section-quiz-lpanel',
  imports: [CommonModule],
  templateUrl: './section-quiz-lpanel.component.html',
  styleUrl: './section-quiz-lpanel.component.css',
  standalone: true
})
export class SectionQuizLpanelComponent {
  loggedInUser:User|null = null;

  constructor(private authService:AuthService,public showImageService:ShowImageService){
    authService.getUser().then((user)=>{
      this.loggedInUser = user;
    })
  }

   questions = Array.from({ length: 60 }, (_, i) => ({
    number: i + 1,
    status: i === 0 ? 'not-answered' : 'not-visited', // demo statuses
    active: i === 0
  }));
}
