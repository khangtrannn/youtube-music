import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'KTMusic';

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    if (!this.location.path()) {
      this.router.navigate(['/search-results'], {
        queryParams: {
          keyword: 'lofi chill',
        },
        skipLocationChange: true,
      });
    }
  }
}
