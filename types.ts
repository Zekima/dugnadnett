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

export interface Address {
  latitude: number;
  longitude: number;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  country: string;
  countryCode: string;
  countryFlag: string;
  distance: number;
  city: string;
  number: string;
  postalCode: string;
  stateCode: string;
  state: string;
  street: string;
  layer: string;
  formattedAddress: string;
  addressLabel: string;
}
