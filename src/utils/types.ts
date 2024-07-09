export type ResponseType<T> = {
  data?: T;
  isOk: boolean;
  message: string;
};

export type BookType = {
  book: {
    id: number;
    isbn: string;
    title: string;
    cover: string;
    author: string;
    published: number;
    pages: number;
  };
  status: number;
};
