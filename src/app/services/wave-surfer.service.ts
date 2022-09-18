import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { first, race, ReplaySubject, timer } from 'rxjs';
import { ExternalResourceLoaderService } from './external-resource-loader.service';

interface WaveSurfer {
  create(id: string): any;
}

declare const WaveSurfer: WaveSurfer;

@Injectable({
  providedIn: 'root'
})
export class WaveSurferService {
  private waveSurfer$ = new ReplaySubject<WaveSurfer>(1);

  constructor(private loader: ExternalResourceLoaderService, private zone: NgZone, private appRef: ApplicationRef) {}

  public init(): void {
    race(timer(5000), this.appRef.isStable.pipe(first((isStable) => isStable === true))).subscribe(() => {
      this.zone.runOutsideAngular(() => this.loadWaveSurfer());
    });
  }

  private loadWaveSurfer() {
    this.loader.loadScript('https://unpkg.com/wavesurfer.js').subscribe(() => {
      this.zone.run(() => this.waveSurfer$.next(WaveSurfer));
    });
  }
}
