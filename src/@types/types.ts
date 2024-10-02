import { OrderStatus } from "@/core/OrderStatus.enum";

export type UserType = {
  id: string;
  username: string;
  password: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type OrderRequestType = {
  product: ProductType;
  quantity: number;
};

export type OrderType = {
  id: string;
  listItens: OrderRequestType[];
  status: OrderStatus;
  user_id: string;
};
