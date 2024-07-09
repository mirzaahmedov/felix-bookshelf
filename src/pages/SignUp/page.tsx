import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth";
import { schema, signupQuery } from "./queries";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupQuery,
    onSuccess(result) {
      if (!result.isOk || !result.data) {
        throw new Error(result.message);
      }
      setUser(result.data);
      toast.success("Signup successful");
      setTimeout(() => {
        navigate("/");
      }, 0);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
      defaultValues: {
        name: "",
        email: "",
        key: "",
        secret: "",
        confirm: "",
      },
    }
  );

  const onSubmit = (values: z.infer<typeof schema>) => {
    signup(values);
  };

  const { errors } = formState;

  return (
    <main className="flex items-center justify-center">
      <Box
        width="100%"
        maxWidth={430}
        bgcolor="white"
        px={3.5}
        py={6}
        borderRadius={1.5}
        boxShadow="0px 4px 32px 0px #3333330A"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[2.25rem]"
        >
          <Typography variant="h1" textAlign="center">
            Sign up
          </Typography>
          <div className="flex flex-col gap-4">
            <TextField
              variant="outlined"
              fullWidth
              label="Fullname"
              placeholder="Enter your fullname"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              placeholder="Enter your username"
              error={!!errors.key}
              helperText={errors.key?.message}
              {...register("key")}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              placeholder="Enter your email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              placeholder="Enter your password"
              error={!!errors.secret}
              helperText={errors.secret?.message}
              {...register("secret")}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm password"
              placeholder="Enter your confirm password"
              error={!!errors.confirm}
              helperText={errors.confirm?.message}
              {...register("confirm")}
            />
          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isPending}
          >
            Submit
          </Button>
          <Typography textAlign="center" variant="subtitle1">
            Already signed up?{" "}
            <Link to="/sign-in">
              <Typography
                component="span"
                className="hover:underline"
                color={theme.palette.primary.main}
              >
                Go to sign in.
              </Typography>
            </Link>
          </Typography>
        </form>
      </Box>
    </main>
  );
};

export default SignUp;
