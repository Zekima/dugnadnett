export type Category = {
  id: number;
  name: string;
};

export type User = {
  id: string;
  name: string;
};

export type Participant = {
  id: number;
  userId: string;
  dugnadId: number;
}

export type Faq = { 
  id: number;
  title: string;
  text: string;
}

export interface Dugnad {
  id: number;
  ownerId: string;
  image?: string | null;
  title: string;
  location: {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
  };
  date: Date;
  info: string;
  createdAt: Date;
  categories: Category[];
  status: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}