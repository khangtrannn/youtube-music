import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { SearchVideoResponse } from '../models/search-video-response';
import { Video } from '../models/video';

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

  constructor(private http: HttpClient) {}

  getAllVideos(): Observable<any[]> {
    return this.http.get<any>('/api/videos');
  }

  getVideoDetail(id: string): Observable<Video> {
    return this.http.get<Video>(`/api/videos/detail/${id}`);
  }
}
