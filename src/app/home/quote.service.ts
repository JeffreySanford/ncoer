import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable()
export class QuoteService {
  constructor(private http: HttpClient) {}

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    return this.http.get(routes.quote(context)).pipe(
      map((body: any) => body.value),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
}
