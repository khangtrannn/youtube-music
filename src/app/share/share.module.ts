import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
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
    NgxSkeletonLoaderModule.forRoot({ animation: false, theme: { 'background-color': '#992929' } })
  ],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ShareModule {}
