export class Order {
  id: number;
  status: string;
  created_at: string;
  total_quantity: number;
  cost_of_order: number;
  products_delivery_orders: Array<any>;
}