export interface DogImages {
  images: string[];
}

export class DogImagesDto implements DogImages {
  images: string[] = [];

  constructor(data: Partial<DogImages> = {}) {
    Object.assign(this, data);
  }

  static fromResponse(res: any): DogImagesDto {
    const r = res ?? {};
    const msg = r.message;
    return new DogImagesDto({
      images: Array.isArray(msg) ? msg : msg ? [msg] : [],
    });
  }
}
