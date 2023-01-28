import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video, VideoLoading } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllVideos(): Observable<any[]> {
    return this.http.get<any>('/api/videos');
  }

  getVideoDetail(id: string): Observable<Video> {
    return this.http.get<Video>(`/api/videos/detail/${id}`);
  }

  getNumberVideosPerRow(): number {
    return +getComputedStyle(
      document.querySelector('.video-list') as Element
    ).getPropertyValue('--columns-per-row');
  }

  getSkeletons(): VideoLoading[] {
    return Array(12)
      .fill(-1)
      .map(() => new VideoLoading());
  }
}
