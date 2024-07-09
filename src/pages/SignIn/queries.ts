import z from "zod";
import axios from "axios";
import { ResponseType } from "@/utils/types";

export const schema = z.object({
  key: z.string().min(1, "Required field"),
  secret: z.string().min(1, "Required field"),
});

export type SigninResponse = {
  email: string;
  id: number;
  key: string;
  name: string;
  secret: string;
};
export const signinQuery = async (values: z.infer<typeof schema>) => {
  const { data } = await axios.get<ResponseType<SigninResponse>>("/myself", {
    auth: {
      username: values.key,
      password: values.secret,
    },
  });
  return data;
};
