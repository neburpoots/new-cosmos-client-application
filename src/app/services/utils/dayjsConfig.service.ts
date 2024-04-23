import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

@Injectable({
  providedIn: 'root'
})
export class DayjsConfigService {
  constructor() {
    // Import the timezone and UTC plugins
    dayjs.extend(utc);
    dayjs.extend(timezone);

    // Set the default timezone to 'Europe/Berlin'
    dayjs.tz.setDefault('Europe/Berlin');
  }
}
