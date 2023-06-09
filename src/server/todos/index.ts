import { authApi } from "~/server/core";

export const createTodo = async (todo: string) => {
  const response = await authApi.post("/todos", { todo });
  return response;
};

export const getTodos = async () => {
  const response = await authApi.get("/todos");
  return response;
};

export const updateTodo = async (id: number, todo: string, isCompleted: boolean) => {
  const response = await authApi.put(`/todos/${id}`, { todo, isCompleted });
  return response;
};

export const deleteTodo = async (id: number) => {
  const response = await authApi.delete(`/todos/${id}`);
  return response;
};
