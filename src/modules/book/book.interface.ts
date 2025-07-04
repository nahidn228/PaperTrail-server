export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY"
    | "CLASSIC"
    | "PROGRAMMING";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  price: number;
  photo: string;
  updateAvailability?: () => void;
}
