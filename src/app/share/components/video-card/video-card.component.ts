import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent {
  @Input() video!: Video;
  @Input() routerLink = '';
  @Input() displayFavoriteIcon = false;

  @Output() onFavorite = new EventEmitter<void>();

  onFavoriteClick(): void {
    this.onFavorite.emit();
  }
}
