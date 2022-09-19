import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { SearchVideoResponse } from '../models/search-video-response';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class SearchVideoService {
  private continuation!: string;
  private visitorData!: string;

  private videos: Video[] = [];

  constructor(private http: HttpClient) {}

  searchVideo(keyword: string): Observable<Video[]> {
    if (!keyword) {
      return of([]);
    }

    return this.http.get<SearchVideoResponse>('/api/videos/search?keyword=' + keyword).pipe(
      tap((response) => {
        this.videos = response.videos;
        this.continuation = response.continuation;
        this.visitorData = response.visitorData;
      }),
      map((response) => response.videos)
    );
  }

  searchVideoContinuation(): Observable<Video[]> {
    return this.http
      .post<SearchVideoResponse>('/api/videos/search/continuation', {
        continuation: this.continuation,
        visitorData: this.visitorData,
      })
      .pipe(
        tap((response) => {
          this.continuation = response.continuation;
          this.videos.push(...response.videos);
        }),
        map((response) => response.videos)
      );
  }
}
