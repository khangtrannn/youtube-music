import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from './../../services/favorite.service';
import { VideoService } from 'src/app/services/video.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { trigger, style, transition, animate } from '@angular/animations';
import { panelInOut } from 'src/app/share/animations/panelAnimation';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [VideoService],
  animations: [
    panelInOut,
    trigger('simpleFadeAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate(400)]),
      transition(
        ':leave',
        animate(
          400,
          style({
            opacity: 0,
            transform: 'translateX(-100%)',
          })
        )
      ),
    ]),
  ],
})
export class PlaylistComponent {
  playingVideo!: Video;

  constructor(
    public videoService: VideoService,
    public favoriteService: FavoriteService,
    public backgroundService: BackgroundService
  ) {}
}
