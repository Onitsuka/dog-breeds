export interface DogSubBreeds {
  subBreeds: string[];
}

export class DogSubBreedsDto implements DogSubBreeds {
  subBreeds: string[] = [];

  constructor(data: Partial<DogSubBreeds> = {}) {
    Object.assign(this, data);
  }

  static fromResponse(res: any): DogSubBreedsDto {
    const r = res ?? {};
    return new DogSubBreedsDto({
      subBreeds: Array.isArray(r.message) ? r.message : [],
    });
  }
}
