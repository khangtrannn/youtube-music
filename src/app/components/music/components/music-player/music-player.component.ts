import { VideoService } from './../../../../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) { }

  ngOnInit() {
    // this.activatedRoute.params
    //   .pipe(
    //     switchMap((params) => this.videoService.searchVideo(params['id']))
    //   )
    //   .subscribe((videos) => {
    //     console.log(videos);
    //   });
  }

}
