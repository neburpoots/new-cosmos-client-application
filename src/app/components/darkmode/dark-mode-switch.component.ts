// dark-mode-switch.component.ts
import { Component } from '@angular/core';
import { DarkModeService } from '../../services/darkmode/dark-mode.service';

@Component({
  selector: 'app-dark-mode-switch',
  templateUrl: './dark-mode-switch.component.html',
})
export class DarkModeSwitchComponent {
  isDarkMode: boolean;

  constructor(private darkModeService: DarkModeService) {
    this.isDarkMode = this.darkModeService.isDarkMode;
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode(!this.darkModeService.isDarkMode);
  }
}
