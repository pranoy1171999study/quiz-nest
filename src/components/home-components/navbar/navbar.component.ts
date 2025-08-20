import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class NavbarComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initializeTheme();
  }

  initializeTheme(): void {
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    const userPrefersDark =
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (userPrefersDark) {
      lightIcon?.classList.remove('hidden');
      darkIcon?.classList.add('hidden');
      document.documentElement.classList.add('dark');
    } else {
      darkIcon?.classList.remove('hidden');
      lightIcon?.classList.add('hidden');
      document.documentElement.classList.remove('dark');
    }
  }

  themeToggleBtnOnClick(): void {
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // toggle icons
    darkIcon?.classList.toggle('hidden');
    lightIcon?.classList.toggle('hidden');

    const currentTheme = localStorage.getItem('color-theme');
    if (currentTheme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else if (currentTheme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      // Fallback
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  }
}
