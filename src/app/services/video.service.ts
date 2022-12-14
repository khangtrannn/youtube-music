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
  private favorites: Video[] | undefined;
  private onVideoChanged$ = new ReplaySubject<string>(1);
  private onUnfavorite$ = new ReplaySubject<string>(1);

  constructor(private http: HttpClient, private userService: UserService) {}

  changeVideo(videoId: string): void {
    this.onVideoChanged$.next(videoId);
  }

  onVideoChanged(): Observable<string> {
    return this.onVideoChanged$.asObservable();
  }

  onUnfavorite(): Observable<string> {
    return this.onUnfavorite$.asObservable();
  }

  getAllVideos(): Observable<any[]> {
    return this.http.get<any>('/api/videos');
  }

  getVideoDetail(id: string): Observable<Video> {
    return this.http.get<Video>(`/api/videos/detail/${id}`);
  }

  favoriteVideo(favoriteDto: FavoriteDto): Observable<any> {
    return this.isFavorite(favoriteDto.video.id).pipe(switchMap((isFavorite) => {
      if (isFavorite) {
        return of();
      }

      this.favorites?.unshift(favoriteDto.video);
      return this.http.post<any>(`/api/videos/favorite`, favoriteDto);
    }));
  }

  unfavoriteVideo(favoriteDto: FavoriteDto): Observable<any> {
    this.onUnfavorite$.next(favoriteDto.video.id);
    return this.http.post<any>(`/api/videos/unfavorite`, favoriteDto);
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
    return this.getAllFavorites().pipe(switchMap((favorites) => of(!!favorites.find((favorite) => favorite.id === videoId))));
  }
}
