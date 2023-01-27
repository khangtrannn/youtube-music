import { LocalStorageService } from './../../../services/local-storage.service';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: SocialUser | undefined;
  keyword!: string;

  constructor(
    private readonly _authService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  onSearch(): void {
    this.router.navigate(['/results'], {
      queryParams: { keyword: this.keyword },
    });
  }
}
