import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title!: string;
  @Input() channel!: string;
  @Input() thumbnail!: string;
  @Input() videoId!: string;

  @Output() videoChanged = new EventEmitter<string>();

  onClick(): void {
    this.videoChanged.emit(JSON.stringify({ videoId: this.videoId, videoTitle: this.title }));
  }
}
