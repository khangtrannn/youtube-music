import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalResourceLoaderService {
  loadScript(script: string): Observable<void> {
    return new Observable((observer) => {
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = script;
      gtmScript.addEventListener('load', () => observer.next());
      gtmScript.addEventListener('error', () => observer.error());
      document.head.insertBefore(gtmScript, document.head.firstChild);
    });
  }
}

