export interface Service {
  id: string;
  is_deleted: number;
  created_at: string;
  updated_at: string | null;
  name: string;
  price: number;
  description: string;
  image: string;
  service_terms: any | null;
  order_items: any | null;
}
