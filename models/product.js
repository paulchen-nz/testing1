// id, ownerId, title, imageURl, description, price

class Products {
  constructor(id, ownerId, title, imageURL, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageURL = imageURL;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

export default Products;
