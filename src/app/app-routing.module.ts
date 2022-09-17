import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search-results',
    component: SearchResultComponent,
  }
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
