import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { SearchVideoResponse } from '../models/search-video-response';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  continuation!: string;
  visitorData!: string;

  constructor(private http: HttpClient) {}

  getAllVideos(): Observable<any[]> {
    return this.http.get<any>('/api/videos');
  }

  searchVideo(keyword: string): Observable<Video[]> {
    if (!keyword) {
      return of([]);
    }

    return this.http.get<SearchVideoResponse>('/api/videos/search?keyword=' + keyword).pipe(
      tap((response) => {
        this.continuation = response.continuation;
        this.visitorData = response.visitorData;
      }),
      map((response) => response.videos)
    );
  }

  searchVideoContinuation(): Observable<any> {
    return this.http
      .post<any>('/api/videos/search/continuation', {
        continuation: this.continuation,
        visitorData: this.visitorData,
      })
      .pipe(tap((response) => this.continuation = response.continuation));
  }
}
