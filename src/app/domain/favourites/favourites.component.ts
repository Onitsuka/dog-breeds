// src/app/domain/favourites/favourites.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Favourite {
  url: string;
  breed: string;
}

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  favourites = signal<Favourite[]>([]);

  addFavourite(url: string, breed: string): void {
    if (!this.favourites().some(f => f.url === url)) {
      this.favourites.update(list => [...list, { url, breed }]);
    }
  }

  removeFavourite(url: string): void {
    this.favourites.update(list => list.filter(f => f.url !== url));
  }

  selectFavourite(f: Favourite): void {
    // TODO: emit selection to parent
    console.log('Selected favourite', f);
  }
}
