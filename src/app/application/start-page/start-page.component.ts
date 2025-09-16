import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralDisplayComponent } from '../../domain/general-display/general-display.component';
import { FavouritesComponent } from '../../domain/favourites/favourites.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule, GeneralDisplayComponent, FavouritesComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {}
