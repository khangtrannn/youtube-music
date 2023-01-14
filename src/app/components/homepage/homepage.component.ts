import { Component, OnInit } from '@angular/core';
import { Subject, switchMap, map, startWith, tap, BehaviorSubject } from 'rxjs';
import { Video } from 'src/app/models/video';
import { SearchVideoService } from 'src/app/services/search-video.service';

const KEY_WORD = 'study with me';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  private onDestroy$ = new Subject<void>();

  // videos$ = this.searchVideoService
  //   .searchVideo(KEY_WORD)
  //   .pipe(startWith(new Array(12)));

  videos$ = new Subject<Video[]>();

  constructor(private searchVideoService: SearchVideoService) {}

  ngOnInit(): void {}

  loadMore(): void {
    // this.videos$ = this.videos$.pipe(
    //   switchMap((currentVideos) =>
    //     this.searchVideoService
    //       .searchVideoContinuation()
    //       .pipe(map((newVideos) => [...currentVideos, ...newVideos]))
    //   )
    // );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
