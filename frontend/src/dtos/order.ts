export interface OrderDto {
  name: string;
  email: string;
  phone: string;
  message: string;
  order_items?: string[];
}
