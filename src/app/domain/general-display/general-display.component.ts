import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogFacadeService } from '../../../shared/infrastructure/services/dog-facade.service';
import { FavouritesService } from '../../../shared/infrastructure/services/favourites.service';
import { ThumbnailItemComponent } from "../../../shared/ui/thumbnail-item/thumbnail-item.component";

interface DogThumb {
  url: string;
  breed: string;
}

@Component({
  selector: 'app-general-display',
  standalone: true,
  imports: [CommonModule, ThumbnailItemComponent],
  templateUrl: './general-display.component.html',
  styleUrl: './general-display.component.scss',
})
export class GeneralDisplayComponent implements OnInit {
  mainImage = signal<string | null>(null);
  mainBreed = signal<string | null>(null);
  thumbnails = signal<DogThumb[]>([]);

  constructor(
    private dogs: DogFacadeService,
    private favourites: FavouritesService
  ) {
  }

  ngOnInit(): void {
    this.loadMainImage();
    this.loadThumbnails();
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

  private extractBreed(url: string): string {
    const match = url.match(/breeds\/([^/]+)\//);
    if (!match) return 'Unknown';
    return match[1].replace('-', ' ');
  }
}
