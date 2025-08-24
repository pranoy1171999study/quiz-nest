import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  passwordMismatch = false;
  fullName = '';
  error: string | null = null;
  success = false;
  loading = false;

  constructor(private authService: AuthService) { }

  checkPasswords() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  async onSubmit(form: NgForm) {
    if (form.invalid || this.passwordMismatch) return;

    this.loading = true;
    this.error = null;
    try {
      await this.authService.signUp(this.email, this.password, this.fullName);
      this.success = true;
    } catch (err: any) {
      this.error = err.message || 'Signup failed.';
    } finally {
      this.loading = false;
    }
  }
}
