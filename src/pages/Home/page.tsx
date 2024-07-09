import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { PlusIcon } from "@/assets/icons";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Header from "./components/Header";
import CreateBookDialog from "./components/CreateBookDialog";
import EditBookDialog from "./components/EditBookDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBookQuery,
  deleteBookQuery,
  editBookQuery,
  getBooksQuery,
} from "./queries";
import BooksGrid from "./components/BooksGrid";
import { toast } from "react-toastify";
import { BookType } from "@/utils/types";

const Home = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: getBooksQuery,
  });
  const { mutate: createBook, isPending: isCreating } = useMutation({
    mutationFn: createBookQuery,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      toast.success("Book created successfully");
      setOpenCreateDialog(false);
    },
    onError() {
      toast.error("Could not create new book");
    },
  });
  const { mutate: editBook, isPending: isEditing } = useMutation({
    mutationFn: editBookQuery,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      toast.success("Book edited successfully");
      setOpenEditDialog(false);
    },
    onError() {
      toast.error("Could not edit the book");
    },
  });
  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: deleteBookQuery,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      toast.success("Book deleted successfully");
    },
    onError() {
      toast.error("Could not delete the book");
    },
  });

  useEffect(() => {
    if (!openCreateDialog) {
      setSelectedBook(null);
    }
  }, [openCreateDialog]);
  useEffect(() => {
    if (!openEditDialog) {
      setSelectedBook(null);
    }
  }, [openEditDialog]);

  return (
    <main>
      <Header />
      <div className="py-9">
        <div className="px-[6.25rem]">
          <div className="flex items-center justify-between">
            <Typography variant="h1" color={theme.palette.text.secondary}>
              You’ve got{" "}
              <Typography
                variant="h1"
                component="span"
                color={theme.palette.primary.main}
              >
                {books?.data?.length ?? 0} book
              </Typography>
            </Typography>
            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              onClick={() => setOpenCreateDialog(true)}
            >
              Create a book
            </Button>
          </div>
          <div className="mt-3">
            <Typography variant="h5" color={theme.palette.text.secondary}>
              Your books today
            </Typography>
          </div>
        </div>
        <div>
          {Array.isArray(books?.data) ? (
            <BooksGrid
              books={books?.data}
              onDelete={deleteBook}
              onEdit={(_, book) => {
                setSelectedBook(book);
                setOpenEditDialog(true);
              }}
              isDeleting={isDeleting}
            />
          ) : null}
        </div>
      </div>
      <CreateBookDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onSubmit={createBook}
        isPending={isCreating}
      />
      <EditBookDialog
        selectedBook={selectedBook}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onSubmit={editBook}
        isPending={isEditing}
      />
    </main>
  );
};

export default Home;
