import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ShareModule } from './share/share.module';
import { HeaderComponent } from './share/components/header/header.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MusicComponent } from './components/music/music.component';
import { MusicPlayerComponent } from './components/music/components/music-player/music-player.component';
import { StartupService } from './services/startup.service';
import { SuggestVideoComponent } from './components/suggest-video/suggest-video.component';
import { BackgroundComponent } from './components/background/background.component';

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
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () =>
        injector.get(StartupService).start(),
      deps: [Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
