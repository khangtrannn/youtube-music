import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatIconModule } from '@angular/material/icon';

const declarations = [VideoCardComponent];

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatIconModule,
  ],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ShareModule {}
