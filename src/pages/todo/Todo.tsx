import React, { useEffect, useState } from "react";
import { Box, VStack, Heading, Text, Checkbox, Input, Button, List, ListItem, Flex } from "@chakra-ui/react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "~/server/todos";

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
}

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState("");

  useEffect(() => {
    getTodos().then(async ({ data }) => {
      setTodos(data);
    });
  }, []);

  const handleTodoCreate = () => {
    createTodo(newTodoTitle).then(async ({ data }) => {
      setTodos([...todos, data]);
    });
    setNewTodoTitle("");
  };

  const handleTodoCheckboxChange = (todo: Todo) => {
    updateTodo(todo.id, todo.todo, !todo.isCompleted).then(async ({ data }) => {
      const updatedTodos = todos.map((todo: Todo) => {
        if (todo.id === data.id) {
          return data;
        }
        return todo;
      });
      setTodos(updatedTodos);
    });
  };

  const handleTodoDelete = (id: number) => {
    deleteTodo(id).then(async ({ status }) => {
      if (status === 204) {
        const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
    });
  };

  const handleTodoEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditingTodoTitle(todo.todo);
  };

  const handleTodoEditingSubmit = () => {
    if (!editingTodo) return;
    updateTodo(editingTodo.id, editingTodoTitle, editingTodo.isCompleted).then(async ({ data }) => {
      const updatedTodos = todos.map((todo: Todo) => {
        if (todo.id === data.id) {
          return data;
        }
        return todo;
      });

      setTodos(updatedTodos);
    });
  };

  return (
    <Box p={4} maxWidth={400} mx="auto">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg">
          TODO List
        </Heading>
        <VStack spacing={2} align="stretch">
          <Flex>
            <Input
              data-testid="new-todo-input"
              placeholder="새로운 TODO 입력"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
            <Button data-testid="new-todo-add-button" colorScheme="teal" onClick={handleTodoCreate}>
              추가
            </Button>
          </Flex>

          <List spacing={2}>
            {todos.map((todo: Todo) => (
              <ListItem key={todo.id}>
                <Flex alignItems="center">
                  <Checkbox isChecked={todo.isCompleted} onChange={() => handleTodoCheckboxChange(todo)} />
                  {editingTodo === todo ? (
                    <Input
                      data-testid="modify-input"
                      value={editingTodoTitle}
                      onChange={(e) => {
                        setEditingTodoTitle(e.target.value);
                      }}
                    />
                  ) : (
                    <Text textDecoration={todo.isCompleted ? "line-through" : "none"}>{todo.todo}</Text>
                  )}
                </Flex>

                {editingTodo === todo ? (
                  <Flex mt={2}>
                    <Button data-testid="submit-button" colorScheme="teal" onClick={handleTodoEditingSubmit}>
                      제출
                    </Button>
                    <Button
                      data-testid="cancel-button"
                      colorScheme="gray"
                      onClick={() => {
                        setEditingTodo(null);
                        setEditingTodoTitle("");
                      }}
                      ml={2}
                    >
                      취소
                    </Button>
                  </Flex>
                ) : (
                  <Flex mt={2}>
                    <Button data-testid="modify-button" colorScheme="teal" onClick={() => handleTodoEdit(todo)}>
                      수정
                    </Button>
                    <Button
                      data-testid="delete-button"
                      colorScheme="red"
                      onClick={() => handleTodoDelete(todo.id)}
                      ml={2}
                    >
                      삭제
                    </Button>
                  </Flex>
                )}
              </ListItem>
            ))}
          </List>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Page;
