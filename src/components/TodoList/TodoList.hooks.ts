import { ITodo } from "entities/ITodo";
import { createRef, useMemo } from "react";

export const useActiveTodos = (todoData: ITodo[]) => {
  return useMemo(() => {
    let activeTodosCount = 0;
    const todos = todoData.map((todo) => {
      if (!todo.completed) {
        activeTodosCount++;
      }
      return {
        ...todo,
        node: createRef<HTMLDivElement>(),
      };
    });
    return {
      todos,
      activeTodosCount,
    };
  }, [todoData]);
};
