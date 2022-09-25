import { VideoService } from 'src/app/services/video.service';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private onDestroy$ = new Subject<void>();

  videos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getAllFavorites().pipe(takeUntil(this.onDestroy$)).subscribe((favorites) => {
      console.log(favorites);
    });
  }
}
