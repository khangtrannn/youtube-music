import { SuggestVideosResponse } from './../models/suggest-videos-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap, switchMap } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class SuggestVideoService {
  private continuation!: string;
  private visitorData!: string;
  private isMore = true;

  private suggestVideos: Video[] = [];

  constructor(private http: HttpClient) {}

  initData(videoId: string): Observable<SuggestVideosResponse> {
    return this.http
      .get<SuggestVideosResponse>(`/api/videos/suggestion/${videoId}`)
      .pipe(
        tap((response) => {
          this.visitorData = response.visitorData;
          this.continuation = response.continuation;
          this.suggestVideos = response.videos;
        })
      );
  }

  getSuggestVideosContinuation(): Observable<Video[]> {
    return this.http
      .post<SuggestVideosResponse>('/api/videos/suggestion/continuation', {
        continuation: this.continuation,
        visitorData: this.visitorData,
      })
      .pipe(
        tap((response) => {
          this.continuation = response.continuation;

          if (!response.continuation) {
            this.isMore = false;
          }
        }),
        map((response) => response.videos)
      );
  }

  getNextVideo(): Video {
    return this.suggestVideos[0];
  }

  hasMoreSuggestion(): boolean {
    return this.isMore;
  }
}
