import { OrderItem } from './Order';

export interface Service {
  id: string;
  is_deleted: number;
  created_at: string;
  updated_at: string | null;
  name: string;
  price: number;
  description: string;
  image: string;
  service_terms: ServiceTerm[];
  order_items: OrderItem[];
}

export interface ServiceTerm {
  id: string;
  is_deleted: boolean;
  term_name: string;
}
