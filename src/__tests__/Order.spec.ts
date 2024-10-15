import Order from "@/core/Order";
import { OrderStatus } from "@/core/OrderStatus.enum";
import Product from "@/core/Product";

describe("Tests of Product class", () => {
  const productData = {
    id: "00001",
    name: "product-1",
    image: "/**1",
    description: "Product mock test",
    price: 0,
  };
  const orderData = {
    status: OrderStatus.PROCESSING,
    user_id: "user1-id",
  };
  const orderWithIdData = {
    id: "id-0002",
    status: OrderStatus.PROCESSING,
    user_id: "user1-id",
  };

  let product: Product;
  let order: Order;
  let orderWithId: Order;

  beforeEach(() => {
    product = new Product(
      productData.name,
      productData.description,
      productData.image,
      productData.price,
      productData.id,
    );

    order = new Order(product, 10, "user1-id");
    orderWithId = new Order(product, 10, "user1-id", "id-0002");
  });

  describe("Test of class Constructor", () => {
    it("Should be a instance of Order", () => {
      expect(order).toBeInstanceOf(Order);
      expect(orderWithId).toBeInstanceOf(Order);
    });

    it("Should return the error: 'Invalid Order'", () => {
      expect(() => new Order(product, -1, "user-id")).toThrow("Invalid Order.");
    });

    it("Should return the error: 'this product not exists in database.'", () => {
      const product2 = new Product(
        "product name",
        "product description",
        "/*",
        0.0,
      );
      expect(() => new Order(product2, 1, "user-id")).toThrow(
        "this product not exists in database.",
      );
    });
  });

  describe("Test of getProduct method", () => {
    it("Should return a similar object to OrderType", () => {
      expect(order.getOrder()).toEqual({
        listItens: [{ product: productData, quantity: 10 }],
        ...orderData,
      });
      expect(orderWithId.getOrder()).toEqual({
        listItens: [{ product: productData, quantity: 10 }],
        ...orderWithIdData,
      });
    });
  });

  describe("Test of setId method", () => {
    it("Should change id", () => {
      const newId = "newID-123";
      order.setId(newId);
      expect(order.getOrder()).toEqual({
        id: newId,
        listItens: [{ product: productData, quantity: 10 }],
        ...orderData,
      });
    });

    it("Should not change id", () => {
      const newId = "newID-123";
      expect(orderWithId.setId(newId)).toBeUndefined();
    });
  });

  describe("Test of seach method", () => {
    it("Should find a product", () => {
      //como a lista de produtos tem somente um produto, espera-se que o índice do produto seja 0
      //e obedeça o padrão e os valores descritos no objeto parâmetro do .toEqual
      expect(order.search(product)).toEqual({
        item: { product: product.getProduct(), quantity: 10 },
        index: 0,
      });
    });

    it("Should have return null product without id", () => {
      //ao fazer busca por um objeto sem id deve-se ter retorno nulo
      expect(order.search(new Product("name", "desc", "/*", 10.0))).toBeNull();
    });

    it("Should have return null product withid", () => {
      //ao fazer busca por um objeto sem id deve-se ter retorno nulo
      expect(
        order.search(new Product("name", "desc", "/*", 10.0, "****")),
      ).toBeNull();
    });
  });

  describe("Test of addProductToOrder method", () => {
    it("Should add new item to product list", () => {
      for (let i = 2; i < 100; i++) {
        const newProduct = new Product(
          "name",
          "description",
          "*/",
          10,
          "id-000" + i,
        );
        order.addProductToOrder(newProduct, 1);
        expect(order.getOrder().listItens).toHaveLength(i);
      }
    });

    it("Should not add product with negative quantity in order", () => {
      const productTest = new Product("name", "desc", "/*", 10, "id-000**");
      expect(order.addProductToOrder(productTest, -1)).toBeUndefined();
    });

    it("Should throw an exception in case that product do not have id", () => {
      const productWithOutId = new Product("name", "desc", "/*", 10);

      expect(() => order.addProductToOrder(productWithOutId, 10)).toThrow(
        "this product not exists in database.",
      );
    });

    it("Should not add product if it is in the order", () => {
      expect(order.addProductToOrder(product, 10)).toBeUndefined();
    });
  });

  describe("Test of removeProductFromOrder method", () => {
    it("Should be remove product from order", () => {
      //Adiciona novo produto ao pedido para o teste de remoção,
      //esse produto adicionado nas linhas a seguir que será removido neste teste
      const otherProdId = "id-0000***";
      const otherProduct = new Product(
        "will-not-be-removed",
        "will not be removed",
        "/*",
        10.0,
        otherProdId,
      );
      order.addProductToOrder(otherProduct, 1);

      order.removeProductFromOrder(product);

      expect(order.search(product)).toBeNull();
      expect(order.getOrder().listItens).toHaveLength(1);
      expect(order.getOrder().listItens[0].product.id).toEqual(otherProdId);
    });

    it("Should not remove if product not find", () => {
      const otherProduct = new Product(
        "will-not-be-removed",
        "will not be removed",
        "/*",
        10.0,
        "id-0000***",
      );

      expect(order.removeProductFromOrder(otherProduct)).toBeUndefined();
    });
  });

  describe("Test of updateOrderItem method", () => {
    it("Should be updates successfuly", () => {
      const qty = 90;
      order.updateOrderItem(product, qty);
      //o índice de product é 0, pois listItens só tem product e mais nenhum outro
      expect(order.getOrder().listItens[0].quantity).toBe(qty);
    });

    it("Should not update product if quantity is negative", () => {
      const qty = -1;
      expect(order.updateOrderItem(product, qty)).toBeUndefined();
    });

    it("Should remove product if quantity is zero", () => {
      const qty = 0;
      order.updateOrderItem(product, qty);
      expect(order.search(product)).toBeNull();
    });

    it("Should not update product if it not found", () => {
      const qty = 100;
      const otherProduct = new Product(
        "will-not-be-removed",
        "will not be removed",
        "/*",
        10.0,
        "id-0000***",
      );
      expect(order.updateOrderItem(otherProduct, qty)).toBeUndefined();
    });
  });

  describe("Test of updateOrderStatus method", () => {
    it("Should updates order's status", () => {
      const newStatus = OrderStatus.FINISHED;
      order.updateOrderStatus(newStatus);
      expect(order.getOrder().status).toEqual(OrderStatus.FINISHED);
    });

    it("Should updates order's status", () => {
      order.updateOrderStatus(OrderStatus.FINISHED);
      const newStatus = OrderStatus.PROCESSING;

      expect(order.updateOrderStatus(newStatus)).toBeUndefined();
      expect(order.getOrder().status).toEqual(OrderStatus.FINISHED);
    });
  });
});
