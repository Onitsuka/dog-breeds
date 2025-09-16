import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogFacadeService } from '../../../shared/infrastructure/services/dog-facade.service';
import { FavouritesService } from '../../../shared/infrastructure/services/favourites.service';
import { ThumbnailItemComponent } from '../../../shared/ui/thumbnail-item/thumbnail-item.component';
import {SelectComponent} from "../../../shared/ui/select/select.component";

interface DogThumb {
  url: string;
  breed: string;
}

@Component({
  selector: 'app-general-display',
  standalone: true,
  imports: [CommonModule, ThumbnailItemComponent, SelectComponent],
  templateUrl: './general-display.component.html',
  styleUrl: './general-display.component.scss',
})
export class GeneralDisplayComponent implements OnInit {
  mainImage = signal<string | null>(null);
  mainBreed = signal<string | null>(null);
  thumbnails = signal<DogThumb[]>([]);
  breeds = signal<string[]>([]);
  selectedBreed = signal<string | null>(null);

  constructor(
    private dogs: DogFacadeService,
    private favourites: FavouritesService
  ) {
    effect(() => {
      const sel = this.favourites.selected();
      if (sel) {
        this.mainImage.set(sel.url);
        this.mainBreed.set(sel.breed);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.loadBreeds();
    this.loadMainImage();
    this.loadThumbnails();
  }

  loadBreeds(): void {
    this.dogs.listBreeds().subscribe(dto => {
      this.breeds.set(Object.keys(dto.breeds));
    });
  }

  loadMainImage(): void {
    this.dogs.getRandomImage().subscribe(dto => {
      const url = dto.images[0];
      this.mainImage.set(url);
      this.mainBreed.set(this.extractBreed(url));
    });
  }

  loadThumbnails(): void {
    this.dogs.getRandomImages(10).subscribe(dto => {
      const thumbs = dto.images.map(url => ({
        url,
        breed: this.extractBreed(url),
      }));
      this.thumbnails.set(thumbs);
    });
  }

  selectImage(url: string): void {
    this.mainImage.set(url);
    this.mainBreed.set(this.extractBreed(url));
  }

  addToFavourites(): void {
    if (this.mainImage() && this.mainBreed()) {
      this.favourites.add(this.mainImage()!, this.mainBreed()!);
    }
  }

  onBreedSelected(breed: string): void {
    this.selectedBreed.set(breed || null);

    if (!breed) {
      this.loadThumbnails();
      return;
    }

    this.dogs.getImagesByBreed(breed).subscribe(dto => {
      const thumbs = dto.images.slice(0, 10).map(url => ({
        url,
        breed: this.extractBreed(url),
      }));
      this.thumbnails.set(thumbs);

      if (thumbs.length > 0) {
        this.mainImage.set(thumbs[0].url);
        this.mainBreed.set(thumbs[0].breed);
      }
    });
  }

  private extractBreed(url: string): string {
    const match = url.match(/breeds\/([^/]+)\//);
    if (!match) return 'Unknown';
    return match[1].replace('-', ' ');
  }
}
