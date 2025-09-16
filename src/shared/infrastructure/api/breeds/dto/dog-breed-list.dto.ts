export interface DogBreedList {
  breeds: Record<string, string[]>;
}

export class DogBreedListDto implements DogBreedList {
  breeds: Record<string, string[]> = {};

  constructor(data: Partial<DogBreedList> = {}) {
    Object.assign(this, data);
  }

  static fromResponse(res: any): DogBreedListDto {
    const r = res ?? {};
    return new DogBreedListDto({
      breeds: r.message ?? {},
    });
  }
}
