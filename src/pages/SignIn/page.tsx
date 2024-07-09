import z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { schema, signinQuery } from "./queries";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth";

const SignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { mutate: signin, isPending } = useMutation({
    mutationFn: signinQuery,
    onSuccess(result) {
      if (!result.isOk || !result.data) {
        throw new Error(result.message);
      }
      setUser(result.data);
      toast.success("Signin successful");
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
        key: "",
        secret: "",
      },
    }
  );

  const onSubmit = (values: z.infer<typeof schema>) => {
    signin(values);
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
            Sign in
          </Typography>
          <div className="flex flex-col gap-4">
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
              label="Password"
              placeholder="Enter your password"
              error={!!errors.secret}
              helperText={errors.secret?.message}
              {...register("secret")}
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
            Do not have account yet?{" "}
            <Link to="/sign-up">
              <Typography
                component="span"
                className="hover:underline"
                color={theme.palette.primary.main}
              >
                Go to sign up.
              </Typography>
            </Link>
          </Typography>
        </form>
      </Box>
    </main>
  );
};

export default SignIn;
