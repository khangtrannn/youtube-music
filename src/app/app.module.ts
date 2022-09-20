import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { MusicPlayerComponent } from './components/music/components/music-player/music-player.component';
import { MusicComponent } from './components/music/music.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SuggestVideoComponent } from './components/suggest-video/suggest-video.component';
import { StartupService } from './services/startup.service';
import { HeaderComponent } from './share/components/header/header.component';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultComponent,
    MusicComponent,
    MusicPlayerComponent,
    SuggestVideoComponent,
    BackgroundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    NgxSkeletonLoaderModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () =>
        injector.get(StartupService).start(),
      deps: [Injector],
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '428470900096-ms599qb9oosqt4g7btrdvlo1r3n5vk5h.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
