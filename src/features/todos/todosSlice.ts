import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { client } from '../../api/client'

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { ListTodosQuery } from "../../API";
import { listTodos } from "../../graphql/queries";

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await API.graphql(
    graphqlOperation(listTodos)
  ) as GraphQLResult<ListTodosQuery> 
  return response.data.listTodos.items;
})

// export const addNewPost = createAsyncThunk(
//   'todos/addNewPost',
//   async (initialPost) => {
//     const response = await client.post('/fakeApi/todos', { post: initialPost })
//     return response.post
//   }
// )

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
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
  },
})

// export const { postAdded, postUpdated } = todosSlice.actions

export default todosSlice.reducer

export const selectAllTodos = (state) => state.todos.todos

// export const selectTodoById = (state, todoId) =>
//   state.todos.todos.find((todo) => todo.id === todoId)
