import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, of, ReplaySubject, tap, map } from 'rxjs';
import { Video } from '../models/video';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private _favorites: Video[] = [];
  favorites$ = new ReplaySubject<Video[]>(1);

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.http.get<Video[]>(`/api/videos/favorite/${user.id}`)
        )
      )
      .subscribe((favorites) => {
        this._favorites = favorites;
        this.favorites$.next(favorites);
      });
  }

  getAllFavorites(): Observable<Video[]> {
    return this.favorites$.asObservable();
  }

  toggleFavorite(video: Video): Observable<void> {
    return this._favorites.includes(video)
      ? this.removeFromFavorite(video)
      : this.favorite(video);
  }

  favorite(video: Video): Observable<void> {
    this._favorites.push(video);
    this.favorites$.next(this._favorites);

    return this.userService.getUser().pipe(
      switchMap((user) =>
        this.http.post<void>('/api/videos/favorite', {
          video,
          userId: user.id,
        })
      )
    );
  }

  removeFromFavorite(video: Video): Observable<void> {
    this._favorites = this._favorites.filter(
      (favorite) => favorite.id !== video.id
    );
    this.favorites$.next(this._favorites);

    return this.userService.getUser().pipe(
      switchMap((user) =>
        this.http.post<void>(`/api/videos/unfavorite`, {
          video,
          userId: user.id,
        })
      )
    );
  }

  isFavorite(videoId: string): Observable<boolean> {
    return this.getAllFavorites().pipe(
      switchMap((favorites) =>
        of(!!favorites.find((favorite) => favorite.id === videoId))
      )
    );
  }
}
