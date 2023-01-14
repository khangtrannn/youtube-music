import { Component } from '@angular/core';
import { startWith } from 'rxjs';
import { SearchVideoService } from 'src/app/services/search-video.service';
import { VideoService } from 'src/app/services/video.service';

const KEY_WORD = 'study with me';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  videos$ = this.searchVideoService
    .searchVideo(KEY_WORD)
    .pipe(startWith(this.videoService.getSkeletons()));

  constructor(
    private videoService: VideoService,
    private searchVideoService: SearchVideoService
  ) {}
}
