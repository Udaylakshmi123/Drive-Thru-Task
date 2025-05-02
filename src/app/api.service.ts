import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { Lanes } from '../../constants';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private requestCache = new Map<string, Observable<Lanes>>();

  constructor(private http: HttpClient) {}

  get(url: string, params:number): Observable<Lanes> {
    const cacheKey = this.createCacheKey(url, params);

    if (this.requestCache.has(cacheKey)) {
      return this.requestCache.get(cacheKey)!; // ✅ Return cached observable
    }

    const request$ = this.http.get<Lanes>(cacheKey).pipe(
      shareReplay(1), // ✅ Share result with multiple subscribers
      tap({
        error: () => {
          this.requestCache.delete(cacheKey); // ❌ Clear cache on failure
        }
      })
    );

    this.requestCache.set(cacheKey, request$); // Cache the request
    return request$;
  }

  // Clear a specific cache or all
  clearCache(url?: string): void {
    if (url) {
      for (const key of this.requestCache.keys()) {
        if (key.startsWith(url)) {
          this.requestCache.delete(key);
        }
      }
    } else {
      this.requestCache.clear();
    }
  }

  private createCacheKey(url: string, params: number): string {
    return `${url}/${params}`;
  }
}
