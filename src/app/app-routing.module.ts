import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MusicComponent } from './components/music/music.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search-results',
    component: SearchResultComponent,
  },
  {
    path: 'music/:id',
    component: MusicComponent,
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
  },
  {
    path: '',
    component: HomepageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64], // [x, y] - adjust scroll offset
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
