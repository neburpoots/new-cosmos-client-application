import { APP_INITIALIZER, Injectable } from '@angular/core';
import { DarkModeService } from './dark-mode.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private darkModeService: DarkModeService) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Retrieve dark mode state from localStorage
      const isDarkMode = localStorage.getItem('darkModeState') === 'true';
      this.darkModeService.toggleDarkMode(isDarkMode);
      resolve(true);
    });
  }
}

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.initializeApp();
}
