// Simulated in-memory database

export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  colors?: string[];
};

export const db = {
  products: [] as Product[],
};
