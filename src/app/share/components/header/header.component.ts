import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  keyword!: string;

  constructor(private router: Router) {}

  onSearch(): void {
    this.router.navigate(['/search-results'], { queryParams: { keyword: this.keyword } })
  }
}
