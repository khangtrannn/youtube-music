import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent {
  @Input() video: Video | undefined;
}
