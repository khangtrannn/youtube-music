import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

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

  searchVideo(keyword: string): Observable<any> {
    return this.http.get<any>('/api/videos/search?keyword=' + keyword).pipe(
      tap((response) => {
        this.continuation = response.continuation;
        this.visitorData = response.visitorData;
      })
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
