import { api } from "~/server/core";

export const signup = async (email: string, password: string) => {
  const response = await api.post("/auth/signup", { email, password });
  return response;
};
