import { SocialUser } from '@abacritt/angularx-social-login';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const USER_KEY = 'user_info';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, @Inject(SESSION_STORAGE) private sessionStorage: StorageService) {}

  public storeUser(user: SocialUser): void {
    this.storeSessionItem(USER_KEY, user);
  }
  public getUser(): SocialUser {
    return this.getSessionItem(USER_KEY);
  }
  public clearUser(): void {
    return this.removeSession(USER_KEY);
  }

  public getItem<T>(key: string): T {
    return this.storage.get(key) as T;
  }
  public store(key: string, obj: unknown): void {
    this.storage.set(key, obj);
  }

  public remove(key: string): void {
    this.storage.remove(key);
  }

  public getSessionItem<T>(key: string): T {
    return this.sessionStorage.get(key) as T;
  }
  public storeSessionItem(key: string, obj: unknown): void {
    this.sessionStorage.set(key, obj);
  }

  public removeSession(key: string): void {
    this.sessionStorage.remove(key);
  }
}
