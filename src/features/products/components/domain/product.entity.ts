export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public images: string[],
    public category: string,
    public video?: string
  ) {}

  get primaryImage() {
    return this.images[0];
  }
}
