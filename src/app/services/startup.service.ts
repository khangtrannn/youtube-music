import { WaveSurferService } from './wave-surfer.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  start(): void {
    console.log('Add external resource need to load');
  }
}
