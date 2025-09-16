import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DogBreedListDto } from './dto/dog-breed-list.dto';
import { DogImagesDto } from './dto/dog-images.dto';
import { DogSubBreedsDto } from './dto/dog-subbreeds.dto';
import { DOG_FACTORY } from './factories/dog-factory.token';
import { AbstractFactory } from './factories/base/abstract-factory';
import {BaseApiService} from "../base-api.service";

@Injectable({ providedIn: 'root' })
export class DogApiService extends BaseApiService {
  private readonly apiUrl = 'https://dog.ceo/api';

  constructor(
    http: HttpClient,
    @Inject(DOG_FACTORY)
    private readonly dogFactory: AbstractFactory<
      DogBreedListDto | DogImagesDto | DogSubBreedsDto
    >
  ) {
    super(http);
  }

  listBreeds(): Observable<DogBreedListDto> {
    return this.get<any>(`${this.apiUrl}/breeds/list/all`).pipe(
      map(res => DogBreedListDto.fromResponse(res))
    );
  }

  getRandomImage(): Observable<DogImagesDto> {
    return this.get<any>(`${this.apiUrl}/breeds/image/random`).pipe(
      map(res => DogImagesDto.fromResponse(res))
    );
  }

  getRandomImages(count: number): Observable<DogImagesDto> {
    return this.get<any>(`${this.apiUrl}/breeds/image/random/${count}`).pipe(
      map(res => DogImagesDto.fromResponse(res))
    );
  }

  getImagesByBreed(breed: string): Observable<DogImagesDto> {
    return this.get<any>(`${this.apiUrl}/breed/${breed}/images`).pipe(
      map(res => DogImagesDto.fromResponse(res))
    );
  }

  getImagesBySubBreed(breed: string, subBreed: string): Observable<DogImagesDto> {
    return this.get<any>(`${this.apiUrl}/breed/${breed}/${subBreed}/images`).pipe(
      map(res => DogImagesDto.fromResponse(res))
    );
  }

  listSubBreeds(breed: string): Observable<DogSubBreedsDto> {
    return this.get<any>(`${this.apiUrl}/breed/${breed}/list`).pipe(
      map(res => DogSubBreedsDto.fromResponse(res))
    );
  }
}
