import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "firebase.js";
import { child, get, ref, remove, set, update } from "firebase/database";
import { ITodo } from "entities/ITodo";
import { Nullable } from "helpers/types";
import { TODOS_PATH } from "store/consts";

type AddTodoPayloadType = Pick<ITodo, "name" | "description"> & {
  userUid: string;
};

type UpdateTodoPayloadType = ITodo & {
  userUid: string;
};

type RemoveTodoPayloadType = {
  userUid: string;
  todoId: string;
};

type TodosResponseType = {
  [key: string]: ITodo;
};

export const fetchTodos = createAsyncThunk(
  `${TODOS_PATH}/fetchTodos`,
  async (userUid: string): Promise<Nullable<TodosResponseType>> => {
    try {
      const snapshot = await get(
        child(ref(database), `/${userUid}/${TODOS_PATH}`)
      );
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("Not existing TODO data");
        return null;
      }
    } catch (err) {
      console.log("ERROR! Cant fetch TODO data");
      return null;
    }
  }
);

export const addTodo = createAsyncThunk(
  `${TODOS_PATH}/addTodo`,
  async (payload: AddTodoPayloadType): Promise<ITodo> => {
    try {
      const todo = {
        id: new Date().valueOf().toString(),
        name: payload.name,
        description: payload.description,
        completed: false,
      };

      await set(
        ref(database, `/${payload.userUid}/${TODOS_PATH}/${todo.id}`),
        todo
      );
      console.log("New todo added successfully");
      return todo;
    } catch (err) {
      console.log("Error add todo", err);
      throw new Error("Something went wrong - cant added TODO");
    }
  }
);

export const updateTodo = createAsyncThunk(
  `${TODOS_PATH}/updateTodo`,
  async (payload: UpdateTodoPayloadType): Promise<ITodo> => {
    try {
      const todo = {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        completed: payload.completed,
      };
      await update(
        ref(database, `/${payload.userUid}/${TODOS_PATH}/${todo.id}`),
        todo
      );
      console.log("Update todo successfully");
      return todo;
    } catch (err) {
      console.log("Error updating todo", err);
      throw new Error("Something went wrong - cant update TODO");
    }
  }
);

export const removeTodo = createAsyncThunk(
  `${TODOS_PATH}/removeTodo`,
  async (payload: RemoveTodoPayloadType) => {
    try {
      await remove(
        ref(database, `/${payload.userUid}/${TODOS_PATH}/${payload.todoId}`)
      );
      console.log("Todo removed successfully");
      return payload.todoId;
    } catch (err) {
      console.log("Error remove todo", err);
      throw new Error("Something went wrong - cant remove TODO");
    }
  }
);
