import { Injectable } from '@angular/core';
import { DogBreedListDto } from '../dto/dog-breed-list.dto';
import { DogImagesDto } from '../dto/dog-images.dto';
import { DogSubBreedsDto } from '../dto/dog-subbreeds.dto';
import { AbstractFactory } from "./base/abstract-factory";

@Injectable({ providedIn: 'root' })
export class DogFactoryImpl
  implements AbstractFactory<DogBreedListDto | DogImagesDto | DogSubBreedsDto>
{
  createFromResponse(
    res: any
  ): DogBreedListDto | DogImagesDto | DogSubBreedsDto {
    if (res?.message && typeof res.message === 'object' && !Array.isArray(res.message)) {
      return DogBreedListDto.fromResponse(res);
    }

    if (Array.isArray(res?.message) || typeof res?.message === 'string') {
      if (res.message.length > 0 && typeof res.message[0] === 'string' && res.message[0].endsWith('.jpg')) {
        return DogImagesDto.fromResponse(res);
      }
      return DogSubBreedsDto.fromResponse(res);
    }

    return new DogImagesDto();
  }

  createManyFromResponse(
    res: any
  ): (DogBreedListDto | DogImagesDto | DogSubBreedsDto)[] {
    if (Array.isArray(res)) {
      return res.map(item => this.createFromResponse(item));
    }
    if (res && Array.isArray(res.data)) {
      return res.data.map((item: any) => this.createFromResponse(item));
    }
    return [];
  }
}
