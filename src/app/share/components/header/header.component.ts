import { UserService } from './../../../services/user.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.userService.setUser(user);
      }
    });
  }

  onSearch(): void {
    this.router.navigate(['/results'], {
      queryParams: { keyword: this.keyword },
    });
  }
}
