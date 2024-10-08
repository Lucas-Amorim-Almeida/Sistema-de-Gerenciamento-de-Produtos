import Product from "@/core/Product";

describe("Tests of Product class", () => {
  const productData = {
    name: "product-1",
    image: "/**",
    description: "Product mock test",
    price: 0,
  };
  const productWithIdData = {
    id: "00002",
    name: "product-2",
    image: "/**2",
    description: "Product mock test",
    price: 0,
  };

  let product: Product;
  let productWithId: Product;

  beforeEach(() => {
    product = new Product(
      productData.name,
      productData.description,
      productData.image,
      productData.price,
    );
    productWithId = new Product(
      productWithIdData.name,
      productWithIdData.description,
      productWithIdData.image,
      productWithIdData.price,
      productWithIdData.id,
    );
  });

  describe("Test of class Constructor", () => {
    it("Should be a instance of Product", () => {
      expect(product).toBeInstanceOf(Product);
      expect(productWithId).toBeInstanceOf(Product);
    });
  });

  describe("Test of getProduct method", () => {
    it("Should returns a object similar to ProductType", () => {
      expect(product.getProduct()).toEqual(productData);
      expect(Object.keys(product.getProduct())).toHaveLength(4);

      expect(productWithId.getProduct()).toEqual(productWithIdData);
      expect(Object.keys(productWithId.getProduct())).toHaveLength(5);
    });
  });

  describe("Test of setId method", () => {
    it("Should have id change", () => {
      const newId = "12345";
      const userIdAdded = { id: newId, ...productData };

      product.setId(newId);
      expect(product.getProduct()).toEqual(userIdAdded);
      expect(Object.keys(product.getProduct())).toHaveLength(5);
    });

    it("Should not have id change", () => {
      const newId = productWithIdData.id + "12345";
      productWithId.setId(newId);
      expect(productWithId.getProduct()).toEqual(productWithIdData);
    });
  });

  describe("Test of setDecription method", () => {
    it("Should change description of product", () => {
      const newDescription = "new Product description";
      product.setDecription(newDescription);
      expect(product.getProduct().description).toEqual(newDescription);
    });
  });

  describe("Test of setPrice method", () => {
    it("Should change price of product", () => {
      const newPrice = 100;
      product.setPrice(newPrice);
      expect(product.getProduct().price).toEqual(newPrice);
    });
    it("Should not change price of product", () => {
      const newPrice = -1;

      expect(product.setPrice(newPrice)).toBeUndefined();
      expect(product.getProduct().price).toEqual(productData.price);
    });
  });
});
