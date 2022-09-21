import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  keyword!: string;
  user: SocialUser | undefined;
  loggedIn: boolean | undefined;

  constructor(private router: Router, private authService: SocialAuthService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.user = this.localStorageService.getUser();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.localStorageService.storeUser(user);
    });
  }

  onSearch(): void {
    this.router.navigate(['/search-results'], { queryParams: { keyword: this.keyword } })
  }
}
