import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() video: any;

  title!: string;
  channel!: string;
  thumbnail!: string;
  videoId!: string;

  @Output() videoChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.title = this.video.title;
    this.channel = this.video.channel;
    this.thumbnail = (this.video.thumbnails.maxres || this.video.thumbnails.standard || this.video.thumbnails.high)?.url;
  }

  onClick(): void {
    this.videoChanged.emit(JSON.stringify(this.video));
  }
}
