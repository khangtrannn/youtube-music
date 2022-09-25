import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new ReplaySubject<SocialUser>(1);

  setUser(user: SocialUser): void {
    this.user$.next(user);
  }

  getUser(): Observable<SocialUser> {
    return this.user$.asObservable();
  }
}
