import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'proxyImage'
})
export class ProxyImagePipe implements PipeTransform {
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {}

  transform(imageUrl: string): Observable<string | SafeUrl> {
    return this.httpClient
      .get('/api/images?url=' + imageUrl, {
        responseType: 'blob',
      })
      .pipe(
        map((blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
        })
      );
  }
}
