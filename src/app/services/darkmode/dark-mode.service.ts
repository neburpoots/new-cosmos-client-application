// dark-mode.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeKey = 'darkModeState';
  isDarkMode: boolean;

  constructor() {
    // Retrieve dark mode state from localStorage on initialization
    this.isDarkMode = localStorage.getItem(this.darkModeKey) === 'true';
    this.applyDarkModeClass();
  }

  toggleDarkMode(darkMode?: boolean) {
    this.isDarkMode = darkMode ? darkMode : !this.isDarkMode;
    this.applyDarkModeClass();

    // Save dark mode state to localStorage
    localStorage.setItem(this.darkModeKey, this.isDarkMode.toString());
  }

  private applyDarkModeClass() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
