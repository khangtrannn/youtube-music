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
  duration!: string;
  publishedTime!: string;
  view!: string;

  @Output() videoChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.title = this.video.title;
    this.channel = this.video.channelTitle;
    this.duration = this.video.duration;
    this.thumbnail = this.video.thumbnail;
    this.publishedTime = this.video.publishedTime;
    this.view = this.video.view;
  }

  onClick(): void {
    this.videoChanged.emit(JSON.stringify(this.video));
  }
}
