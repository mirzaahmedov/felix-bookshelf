import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { LinkIcon } from "@/assets/icons";

type CreateBookDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (args: { isbn: string }) => void;
  isPending: boolean;
};
const CreateBookDialog = (props: CreateBookDialogProps) => {
  const { open, setOpen, onSubmit, isPending } = props;

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
          const isbn = formData.get("isbn");

          if (!isbn || isbn instanceof File) {
            return;
          }

          onSubmit({ isbn });
        },
      }}
    >
      <DialogTitle variant="h5" fontWeight={600} sx={{ padding: 3.5 }}>
        Create a book
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: 430, width: "100%", paddingY: 0, paddingX: 3.5 }}
      >
        <TextField
          fullWidth
          autoFocus
          required
          variant="outlined"
          id="isbn"
          name="isbn"
          label="ISBN"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className="opacity-25">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
        />
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

export default CreateBookDialog;
