import z from "zod";
import axios from "axios";
import { ResponseType } from "@/utils/types";

export const schema = z.object({
  name: z.string().min(1, "Required field"),
  key: z.string().min(1, "Required field"),
  email: z.string().min(1, "Required field").email(),
  secret: z.string().min(1, "Required field"),
  confirm: z.string().min(1, "Required field"),
});

export type SignupResponse = {
  email: string;
  id: number;
  key: string;
  name: string;
  secret: string;
};
export const signupQuery = async (values: z.infer<typeof schema>) => {
  const { data } = await axios.post<ResponseType<SignupResponse>>(
    "/signup",
    values
  );
  return data;
};
