export type Category = {
  id: number;
  name: string;
};

export type User = {
  id: string;
  name: string;
};

export interface Dugnad {
  id: number;
  ownerId: string;
  image?: string | null;
  title: string;
  area: string;
  date: Date;
  info: string;
  createdAt: Date;
  categories: Category[];
}
