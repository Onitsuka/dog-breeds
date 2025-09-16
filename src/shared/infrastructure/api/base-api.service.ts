import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export abstract class BaseApiService {
  protected constructor(protected http: HttpClient) {}

  protected get<T>(
    url: string,
    options: {
      headers?: HttpHeaders;
      context?: string;
      params?: Record<string, string>;
    } = {}
  ): Observable<T> {
    const headers = options.headers || new HttpHeaders();

    let params = new HttpParams();
    if (options.params) {
      Object.keys(options.params).forEach(key => {
        const val = options.params?.[key];
        if (val !== undefined && val !== null) {
          params = params.set(key, val);
        }
      });
    }

    return this.http
      .get<T>(url, { headers, params })
      .pipe(catchError(this.handleError<T>(options.context || 'GET')));
  }

  protected handleError<T>(context: string) {
    return (error: any): Observable<T> => {
      console.error(`[${context}] Public API Error:`, error);
      return throwError(() => error);
    };
  }
}
