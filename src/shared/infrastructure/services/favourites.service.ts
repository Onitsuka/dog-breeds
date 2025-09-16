import { Injectable, signal } from '@angular/core';

export interface Favourite {
  url: string;
  breed: string;
}

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private readonly _favourites = signal<Favourite[]>([]);
  private readonly _selected = signal<Favourite | null>(null);

  favourites = this._favourites.asReadonly();
  selected = this._selected.asReadonly();

  add(url: string, breed: string): void {
    if (!this._favourites().some(f => f.url === url)) {
      this._favourites.update(list => [...list, {url, breed}]);
    }
  }

  remove(url: string): void {
    this._favourites.update(list => list.filter(f => f.url !== url));

    if (this._selected()?.url === url) {
      this._selected.set(null);
    }
  }

  select(url: string, breed: string): void {
    this._selected.set({url, breed});
  }
}
