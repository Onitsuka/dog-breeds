import { Injectable, signal } from '@angular/core';

export interface Favourite {
  url: string;
  breed: string;
}

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private readonly _favourites = signal<Favourite[]>([]);

  favourites = this._favourites.asReadonly();

  add(url: string, breed: string): void {
    if (!this._favourites().some(f => f.url === url)) {
      this._favourites.update(list => [...list, { url, breed }]);
    }
  }

  remove(url: string): void {
    this._favourites.update(list => list.filter(f => f.url !== url));
  }
}
