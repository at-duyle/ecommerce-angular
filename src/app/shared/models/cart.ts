export class Cart {
  slug: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
  constructor(slug, price, name, image, quantity){
    this.slug = slug;
    this.price = price;
    this.name = name;
    this.image = image;
    this.quantity = quantity;
  }
}
