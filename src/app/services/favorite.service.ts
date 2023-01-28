import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, of, ReplaySubject, tap, map } from 'rxjs';
import { Video } from '../models/video';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllFavorites(): Observable<Video[]> {
    return this.userService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.http.get<Video[]>(`/api/videos/favorite/${user.id}`)
        )
      );
  }

  removeFromFavorite(video: Video): Observable<void> {
    return this.userService
      .getUser()
      .pipe(
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
