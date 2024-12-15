import { Customer } from './Customer';
import { Service } from './Service';

export interface Order {
  id: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
  total_price: number;
  customer_id: string;
  customer: Customer;
  description: string | null;
  order_items: OrderItem[];
  message: string | null;
}

export interface OrderItem {
  id: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
  order_id: string;
  order: Order | null;
  service_id: string;
  service: Service;
}
