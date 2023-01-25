import { VideoService } from 'src/app/services/video.service';
import { UserService } from './../../../services/user.service';
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

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private videoService: VideoService,
  ) {}

  ngOnInit(): void {
    this.user = this.localStorageService.getUser();

    this.authService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.localStorageService.storeUser(user);
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
