import { WaveSurferService } from './wave-surfer.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private waveSurferService: WaveSurferService) {}

  start(): void {
    this.waveSurferService.init();
  }
}
