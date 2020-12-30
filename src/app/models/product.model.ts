export interface ProductModelServer {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  photo: string;
  stars: number;
  sale: number;
  reviews: any[];
}
