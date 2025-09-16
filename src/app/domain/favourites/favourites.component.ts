import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesService } from '../../../shared/infrastructure/services/favourites.service';
import { FavouriteItemComponent } from '../../../shared/ui/favourite-item/favourite-item.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, FavouriteItemComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  constructor(public favouritesService: FavouritesService) {}

  removeFavourite(url: string): void {
    this.favouritesService.remove(url);
  }

  selectFavourite(url: string, breed: string): void {
    this.favouritesService.select(url, breed);
  }
}
