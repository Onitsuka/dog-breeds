import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DogApiService} from "../api/breeds/dog-api.service";
import {DogImagesDto} from "../api/breeds/dto/dog-images.dto";
import {DogBreedListDto} from "../api/breeds/dto/dog-breed-list.dto";
import {DogSubBreedsDto} from "../api/breeds/dto/dog-subbreeds.dto";

@Injectable({ providedIn: 'root' })
export class DogFacadeService {
  constructor(private api: DogApiService) {}

  listBreeds(): Observable<DogBreedListDto> {
    return this.api.listBreeds();
  }

  getRandomImage(): Observable<DogImagesDto> {
    return this.api.getRandomImage();
  }

  getRandomImages(count: number): Observable<DogImagesDto> {
    return this.api.getRandomImages(count);
  }

  getImagesByBreed(breed: string): Observable<DogImagesDto> {
    return this.api.getImagesByBreed(breed);
  }

  getImagesBySubBreed(breed: string, subBreed: string): Observable<DogImagesDto> {
    return this.api.getImagesBySubBreed(breed, subBreed);
  }

  listSubBreeds(breed: string): Observable<DogSubBreedsDto> {
    return this.api.listSubBreeds(breed);
  }
}
