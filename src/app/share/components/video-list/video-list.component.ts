import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
  numberOfSkeletons = 12;

  @Input() videos: Video[] = [];
  @Input() isVideoLoading!: boolean;

  @Output('onLoadMore') onScroll = new EventEmitter<void>();
}
