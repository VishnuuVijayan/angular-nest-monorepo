export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Product {
  id?: number;
  price: string;
  name: string;
  image?: string;
  rating: number;
}

export interface PaginationParams {
  [param: string]: string | number | boolean | (string | number | boolean)[];
  page: number;
  perPage: number;
}
