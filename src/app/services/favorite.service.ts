import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, of, ReplaySubject, tap, map } from 'rxjs';
import { Video } from '../models/video';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  favorites$ = new ReplaySubject<Video[]>(1);

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.http.get<Video[]>(`/api/videos/favorite/${user.id}`)
        )
      )
      .subscribe((favorites) => this.favorites$.next(favorites));
  }

  getAllFavorites(): Observable<Video[]> {
    return this.favorites$.asObservable();
  }

  removeFromFavorite(video: Video): Observable<void> {
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
