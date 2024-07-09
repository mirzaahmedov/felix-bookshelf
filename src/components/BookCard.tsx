import { BookType } from "@/utils/types";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { EditIcon, TrashIcon } from "@/assets/icons";
import { bookStatusOptions } from "@/utils/constants";

type BookCardProps = {
  book: BookType;
  onClickDelete: () => void;
  onClickEdit: () => void;
  disableDelete?: boolean;
  disableEdit?: boolean;
};
const BookCard = (props: BookCardProps) => {
  const { book, onClickDelete, onClickEdit, disableDelete, disableEdit } =
    props;
  return (
    <Paper
      className="p-8 relative group flex flex-col"
      sx={{ borderRadius: 1.5 }}
    >
      <Typography fontWeight={600}>{book.book.title}</Typography>
      <ul className="mt-1.5 flex-1">
        <Typography component="li" variant="subtitle1" fontSize={14}>
          Cover:{" "}
          <a href={book.book.cover} className="text-blue-500">
            {book.book.cover}
          </a>
        </Typography>
        <Typography component="li" variant="subtitle1" fontSize={14}>
          Pages: {book.book.pages}
        </Typography>
        <Typography component="li" variant="subtitle1" fontSize={14}>
          Published: {book.book.published}
        </Typography>
        <Typography component="li" variant="subtitle1" fontSize={14}>
          ISBN: {book.book.isbn}
        </Typography>
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <Typography variant="subtitle1" fontSize={14}>
          {book.book.author} / {book.book.published}
        </Typography>
        <Chip
          color={
            bookStatusOptions.find((b) => b.value === book.status)?.color ??
            "error"
          }
          label={bookStatusOptions.find((b) => b.value === book.status)?.label}
        />
      </div>
      <div className="w-8 hidden group-hover:flex absolute left-full top-4 z-50 flex-col gap-0.5">
        <Button
          disabled={disableDelete}
          variant="contained"
          color="error"
          sx={{
            width: 32,
            height: 32,
            minWidth: 0,
            padding: 0,
          }}
          onClick={onClickDelete}
        >
          <TrashIcon />
        </Button>
        <Button
          disabled={disableEdit}
          variant="contained"
          color="primary"
          sx={{
            width: 32,
            height: 32,
            minWidth: 0,
            padding: 0,
          }}
          onClick={onClickEdit}
        >
          <EditIcon />
        </Button>
      </div>
    </Paper>
  );
};

export default BookCard;
