import { useSearchParams } from "react-router-dom";
import BookCard from "@/components/BookCard";
import { BookType } from "@/utils/types";

type BooksGridProps = {
  books: BookType[];
  onDelete: (id: number) => void;
  onEdit: (id: number, book: BookType) => void;
  isDeleting?: boolean;
  isEditing?: boolean;
};
const BooksGrid = (props: BooksGridProps) => {
  const { books, onDelete, onEdit, isDeleting, isEditing } = props;

  const [searchParams] = useSearchParams();

  const term = searchParams.get("search") ?? "";

  return (
    <div className="grid grid-cols-4 py-9 px-[6.25rem] gap-6">
      {books
        .filter((b) => b.book.title.includes(term))
        .map((b) => (
          <BookCard
            key={b.book.id}
            book={b}
            onClickDelete={() => onDelete(b.book.id)}
            onClickEdit={() => onEdit(b.book.id, b)}
            disableDelete={isDeleting}
            disableEdit={isEditing}
          />
        ))}
    </div>
  );
};

export default BooksGrid;
