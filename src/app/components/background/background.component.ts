import { Subject, takeUntil } from 'rxjs';
import { BackgroundService } from './../../services/background.service';
import { Component, OnInit } from '@angular/core';
import { inOutAnimation } from 'src/app/share/animations/inOutAnimation';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  animations: [inOutAnimation]
})
export class BackgroundComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  defaultBackground = 'https://i.pinimg.com/originals/15/ee/18/15ee1830a58416b902b6ef55678f052c.jpg';
  background: string | undefined;

  constructor(public backgroundService: BackgroundService) { }

  ngOnInit() {
    this.backgroundService.getBackground()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((background) => this.background = background)
  }
}
