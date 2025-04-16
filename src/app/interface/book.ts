export interface IBook {
  id: string;
  title: string;
  price: number;
  imageURL: string;
  published: boolean;
  genre: string;
}

export type bookAdd = Omit<IBook, 'id'>;
