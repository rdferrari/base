import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { client } from '../../api/client'

import { API, graphqlOperation } from "aws-amplify";
// import { GraphQLResult } from "@aws-amplify/api";
//  import { ListTodosQuery } from "../../API";
import { listTodos } from "../../graphql/queries";
import { createTodo } from "../../graphql/mutations";

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
}

interface ITodo {
  id?: string;
  name: string;
  description: string | null;
}

export const fetchTodos: AsyncThunk<any, void, {}> = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await API.graphql(
    graphqlOperation(listTodos)
  ) 
  return response.data.listTodos.items;
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (data: ITodo) => {
    try {
      const todo: ITodo = { ...data };
      const result = await API.graphql(graphqlOperation(createTodo, { input: todo }));
      console.log(result.data.createTodo)
      return result.data.createTodo
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoUpdated(state, action) {
      const { id, name, description } = action.payload
      const existingTodo = state.todos.find((todo) => todo.id === id)
      if (existingTodo) {
        existingTodo.name = name
        existingTodo.description = description
      }
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched todos to the array
      state.todos = state.todos.concat(action.payload)
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addNewTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload)
    },
  },
})

export const { todoAdded, todoUpdated } = todosSlice.actions

export default todosSlice.reducer

export const selectAllTodos = (state) => state.todos.todos

// export const selectTodoById = (state, todoId) =>
//   state.todos.todos.find((todo) => todo.id === todoId)
