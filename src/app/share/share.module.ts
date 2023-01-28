import { ProxyImagePipe } from './pipes/proxy-image.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgSwitcheryModule } from 'angular-switchery-ios';
import { FormsModule } from '@angular/forms';

const declarations = [VideoCardComponent, ProxyImagePipe];

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatIconModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    NgSwitcheryModule,
    FormsModule,
  ],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ShareModule {}
