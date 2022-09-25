import { UserService } from './user.service';
import { FavoriteDto } from './../dto/favorite.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  favorites$ = new ReplaySubject<Video[]>(1);
  favorites: Video[] | undefined;

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllVideos(): Observable<any[]> {
    return this.http.get<any>('/api/videos');
  }

  getVideoDetail(id: string): Observable<Video> {
    return this.http.get<Video>(`/api/videos/detail/${id}`);
  }

  favoriteVideo(favoriteDto: FavoriteDto): Observable<any> {
    return this.http.post<any>(`/api/videos/favorite`, favoriteDto);
  }

  getAllFavorites(): Observable<Video[]> {
    if (this.favorites) {
      return of(this.favorites);
    }

    return this.userService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.http
            .get<Video[]>(`/api/videos/favorite/${user.id}`)
            .pipe(tap((favorites) => (this.favorites = favorites)))
        )
      );
  }

  isFavorite(videoId: string): Observable<boolean> {
    return this.getAllFavorites().pipe(
      switchMap((favorites) =>
      {
        console.log(favorites);
        return of(!!favorites.find((favorite) => favorite.id === videoId))

      }
      )
    );
  }
}
