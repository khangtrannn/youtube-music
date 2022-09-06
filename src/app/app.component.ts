import { YoutubeService } from './services/youtube.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'music';

  videos!: any[];

  constructor(
    private route: ActivatedRoute,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((params: ParamMap) => params.get('keyword')),
        switchMap((keyword) =>
          this.youtubeService.getVideosByKeyWord(keyword as string)
        )
      )
      .subscribe((response) => {
        this.videos = response.map((r) => r.snippet);

        console.log(this.videos);
      });
  }
}
