import { BookType } from "@/utils/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { bookStatusOptions } from "@/utils/constants";

type EditBookDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedBook: BookType | null;
  onSubmit: (args: { id: number; status: number }) => void;
  isPending: boolean;
};
const EditBookDialog = (props: EditBookDialogProps) => {
  const { open, setOpen, selectedBook, onSubmit, isPending } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        sx: {
          width: "100%",
          maxWidth: 430,
        },
        onSubmit: (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const status = formData.get("status");

          if (!status || status instanceof File || !selectedBook) {
            return;
          }

          onSubmit({ id: selectedBook.book.id, status: Number(status) });
        },
      }}
    >
      <DialogTitle variant="h5" fontWeight={600} sx={{ padding: 3.5 }}>
        Create a book
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: 430, width: "100%", paddingY: 0, paddingX: 3.5 }}
      >
        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            label="Status"
            defaultValue={selectedBook?.status}
          >
            {bookStatusOptions.map((b) => (
              <MenuItem value={b.value}>{b.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ padding: 3.5, gap: 1.5 }}>
        <Button
          variant="outlined"
          disabled={isPending}
          onClick={() => setOpen(false)}
          className="flex-1"
        >
          Close
        </Button>
        <Button
          variant="contained"
          disabled={isPending}
          type="submit"
          className="flex-1"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookDialog;
