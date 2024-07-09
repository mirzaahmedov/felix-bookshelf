import z from "zod";

const schema = z.object({
  key: z.string().min(1),
  secret: z.string().min(1),
});

export const parseAuthFromLocalStorage = () => {
  try {
    const payload = localStorage.getItem("felix-auth");
    if (!payload) {
      return;
    }
    const data = JSON.parse(payload);
    if (!data) {
      return;
    }
    const validation = schema.safeParse(data);
    if (!validation.success) {
      return;
    }
    return {
      username: validation.data.key,
      password: validation.data.secret,
    };
  } catch {
    return;
  }
};
