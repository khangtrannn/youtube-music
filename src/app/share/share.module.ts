import { ProxyImagePipe } from './pipes/proxy-image.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatIconModule } from '@angular/material/icon';
import { VideoListComponent } from './components/video-list/video-list.component';
import { RouterModule } from '@angular/router';

const declarations = [VideoCardComponent, ProxyImagePipe, VideoListComponent];

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatIconModule,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ShareModule {}
