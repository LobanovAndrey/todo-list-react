import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from 'entities/ITodo';
import { addTodo, fetchTodos, removeTodo, updateTodo } from 'store/actions/todo.actions';
import { TODOS_PATH } from 'store/consts';

const todoSlice = createSlice({
  name: TODOS_PATH,
  initialState: {
    data: [] as ITodo[],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    // FETCH TODOS
    builder.addCase(fetchTodos.pending, (state) => {
      console.log("FETCH TODO PENDING");
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      console.log("FETCH TODO FULLFILLED", action.payload);
      state.loading = false;
      state.data = action.payload ? Object.values(action.payload) : [];
      state.error = '';
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong, cant fetch todos';
    });

    // ADD TODO
    builder.addCase(addTodo.pending, (state) => {
      console.log("ADD TODO PENDING");
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      console.log("ADD TODO FULLFILLED", action.payload);
      state.loading = false;
      state.error = '';
      state.data.push(action.payload);
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong, cant add todo';
    });

    // UPDATE TODO
    builder.addCase(updateTodo.pending, (state) => {
      console.log("UPDATE TODO PENDING");
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      console.log("UPDATE TODO FULLFILLED", action.payload);
      state.loading = false;
      state.error = '';
      const item = state.data.find(todo => todo.id === action.payload.id);
      if (item) {
        item.name = action.payload.name;
        item.description = action.payload.description;
        item.completed = action.payload.completed;
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong, cant uptate todo';
    });

    // REMOVE TODO
    builder.addCase(removeTodo.pending, (state) => {
      console.log("REMOVE TODO");
      state.loading = true;
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      console.log("REMOVE TODO FULLFILLED", action.payload);
      state.loading = false;
      state.data = state.data.filter(todo => todo.id !== action.payload);
      state.error = '';
    });
    builder.addCase(removeTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong, cant remove todo';
    });
  },
})

export default todoSlice.reducer;
