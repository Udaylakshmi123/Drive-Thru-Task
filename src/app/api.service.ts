import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Lanes } from '../../constants';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private requestCache = new Map<string, Observable<Lanes>>();

  constructor(private http: HttpClient) {}

  get(url: string, params:number): Observable<Lanes> {
    const cacheKey = this.createCacheKey(url, params);

    //  return response for existing catched request url matches
    if (this.requestCache.has(cacheKey)) {
      return this.requestCache.get(cacheKey)!;
    }

    const request$ = this.http.get<Lanes>(cacheKey).pipe(shareReplay(1));

    this.requestCache.set(cacheKey, request$); // Cache the request & response
    return request$;
  }

  private createCacheKey(url: string, params: number): string {
    return `${url}/${params}`;
  }
}
