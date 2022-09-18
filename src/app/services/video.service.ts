import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { SearchVideoResponse } from '../models/search-video-response';
import { SuggestVideosResponse } from '../models/suggest-videos-response';
import { Video } from '../models/video';
import { VideoDetailResponse } from '../models/video-detail-response';

interface PageToken {
  end: boolean;
  continuation: string;
  visitorData: string;
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  videoSearchToken: PageToken = {
    end: false,
    continuation: '',
    visitorData: ''
  };

  suggestVideoToken: PageToken = {
    end: false,
    continuation: '',
    visitorData: ''
  };

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
        this.videoSearchToken.continuation = response.continuation;
        this.videoSearchToken.visitorData = response.visitorData;
      }),
      map((response) => response.videos)
    );
  }

  searchVideoContinuation(): Observable<Video[]> {
    return this.http
      .post<SearchVideoResponse>('/api/videos/search/continuation', {
        continuation: this.videoSearchToken.continuation,
        visitorData: this.videoSearchToken.visitorData,
      })
      .pipe(
        tap((response) => this.videoSearchToken.continuation = response.continuation),
        map((response) => response.videos)
      );
  }

  getVideoDetail(id: string): Observable<VideoDetailResponse> {
    return this.http.get<VideoDetailResponse>(`/api/videos/detail/${id}`)
      .pipe(tap((response) => {
        this.suggestVideoToken.visitorData = response.visitorData;
        this.suggestVideoToken.continuation = response.continuation;
      }));
  }

  getSuggestVideosContinuation(): Observable<Video[]> {
    return this.http
      .post<SuggestVideosResponse>('/api/videos/suggestion/continuation', {
        continuation: this.suggestVideoToken.continuation,
        visitorData: this.suggestVideoToken.visitorData,
      })
      .pipe(
        tap((response) => {
          this.suggestVideoToken.continuation = response.continuation;

          if (!response.continuation) {
            this.suggestVideoToken.end = true;
          }
        }),
        map((response) => response.videos)
      );
  }

  haveMoreSuggestion(): boolean {
    return !this.suggestVideoToken.end;
  }
}
