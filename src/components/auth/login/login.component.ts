import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import {User} from '@supabase/supabase-js'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(public authService: AuthService) {}

  async onSubmit() {
    this.loading = true;
    this.error = null;
    try {
      await this.authService.signIn(this.email, this.password);
    } catch (err: any) {
      this.error = err.message || 'Login failed.';
    } finally {
      this.loading = false;
    }
  }
}
