import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from './../../../services/user.service';
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

  @Output() onFavorite = new EventEmitter<void>();

  constructor(
    public userService: UserService,
    public favoriteService: FavoriteService
  ) {}

  onFavoriteClick(): void {
    this.onFavorite.emit();
  }
}
