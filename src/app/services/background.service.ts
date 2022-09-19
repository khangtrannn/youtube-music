import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private background$ = new ReplaySubject<string>(1);

  getBackground(): Observable<string> {
    return this.background$.asObservable();
  }

  setBackground(imageUrl: string): void {
    this.background$.next(imageUrl);
  }
}
