import { Prisma } from "@prisma/client";

type ProductParams = {
  id: string;
  name: string;
  image: string;
  price: Prisma.Decimal;
  description: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
};

type OrderParams = {
  id: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

type OrderItemParams = {
  id: string;
  created_at: Date;
  updated_at: Date;
  order_id: string;
  product_id: string;
  quantity: number;
};

const orderFormater = (orderData: OrderParams) => {
  const formatedData = {
    id: orderData.id,
    status: orderData.status,
  };

  return formatedData;
};

const productFormater = (productData: ProductParams) => {
  const productPrice = Number(productData.price);
  const formatedData = {
    id: productData.id,
    name: productData.name,
    image: productData.image,
    price: productPrice,
    description: productData.description,
    owner_id: productData.owner_id,
  };

  return formatedData;
};

const orderItemFormater = (data: OrderItemParams) => {
  const formatedData = {
    product_id: data.product_id,
    quantity: data.quantity,
  };
  return formatedData;
};

export { orderFormater, productFormater, orderItemFormater };
