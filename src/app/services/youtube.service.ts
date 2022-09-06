import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = 'AIzaSyC8eoQm09jA8c4_2Qs7ekLTHAJYekm-4Tc';
  private baseUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&part=snippet&type=video,id`;

  constructor(private http: HttpClient) {}

  getVideosByKeyWord(keyword: string, maxResults = 50): Observable<any[]> {
    return this.http.get<any>(
      `${this.baseUrl}&maxResults=${maxResults}&q=${keyword}`
    ).pipe(map((response) => response.items));
  }
}
