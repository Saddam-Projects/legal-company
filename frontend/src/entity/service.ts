export interface ServiceTerm {
  id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string | null;
  term_name: string;
  service_id: string;
  service: null;
}

export interface Service {
  id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string | null;
  name: string;
  price: number;
  description: string;
  image: string;
  service_terms: ServiceTerm[];
}
