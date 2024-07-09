import axios from "axios";

import type { BookType, ResponseType } from "@/utils/types";

export const createBookQuery = async (values: { isbn: string }) => {
  const { data } = await axios.post<ResponseType<BookType>>("/books", values);
  return data;
};

export const getBooksQuery = async () => {
  const { data } = await axios.get<ResponseType<BookType[]>>("/books");
  return data;
};

export const deleteBookQuery = async (id: number) => {
  const { data } = await axios.delete<ResponseType<BookType[]>>(`/books/${id}`);
  return data;
};

export const editBookQuery = async (args: { id: number; status: number }) => {
  const { data } = await axios.patch<ResponseType<BookType[]>>(
    `/books/${args.id}`,
    {
      status: args.status,
    }
  );
  return data;
};
