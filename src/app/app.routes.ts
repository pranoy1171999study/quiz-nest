import { Route } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { QuizHomeComponent } from '../components/quiz-bulder/quiz-home/quiz-home.component';
import { QuizViewHomeComponent } from '../components/quiz-viewer/quiz-view-home/quiz-view-home.component';
import { ChannelHomeComponent } from '../components/channel-home/channel-home.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { SignupComponent } from '../components/auth/sign-up/sign-up.component';
import { LayoutComponent } from '../components/home-components/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { GuestGuard } from '../guards/guest.guard';
import { SectionQuizFrameComponent } from '../components/quiz-viewer/components/quiz-renderer/practice-set-quiz/section-quiz-frame/section-quiz-frame.component';

export const appRoutes: Route[] = [
  // Public (no navbar/sidebar)
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [GuestGuard],
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'create', component: QuizHomeComponent },
      { path: 'view', component: QuizViewHomeComponent },
      { path: 'studio', component: ChannelHomeComponent },
      //after development remove the route
      { path: 'section-quiz-frame', component: SectionQuizFrameComponent },
    ],
  },

  // Wildcard redirect
  { path: '**', redirectTo: '' },
];
