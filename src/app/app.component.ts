import { VideoService } from './services/video.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'KTMusic';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/search-results'], {
      queryParams: {
        keyword: 'lofi',
      },
      skipLocationChange: true,
    });
  }
}
