import { InjectionToken } from '@angular/core';
import { DogBreedListDto } from '../dto/dog-breed-list.dto';
import { DogImagesDto } from '../dto/dog-images.dto';
import { DogSubBreedsDto } from '../dto/dog-subbreeds.dto';
import { AbstractFactory } from "./base/abstract-factory";

export const DOG_FACTORY = new InjectionToken<
  AbstractFactory<DogBreedListDto | DogImagesDto | DogSubBreedsDto>
>('DogFactoryImpl');
