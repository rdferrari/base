import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// AWS GraphQl
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { ListTodosQuery, CreateTodoMutation } from "../../API";
import { listTodos } from "../../graphql/queries";
import { createTodo } from "../../graphql/mutations";

interface todosState {
  todos: []
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null;
}

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
} as todosState

console.log(initialState)

interface ITodo {
  id: string;
  name: string;
  description: string | null;
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await API.graphql(
    graphqlOperation(listTodos)
  ) as GraphQLResult<ListTodosQuery>;
  return response.data?.listTodos?.items
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (data: ITodo) => {
    try {
      const todo: ITodo = { ...data };
      const result = await API.graphql(
        graphqlOperation(createTodo, { input: todo })
        ) as GraphQLResult<CreateTodoMutation>
      console.log(result.data?.createTodo)
      return result.data?.createTodo
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // todoUpdated(state, action) {
    //   const { id, name, description } = action.payload
    //   const existingTodo = state.todos.find((todo) => todo.id === id)
    //   if (existingTodo) {
    //     existingTodo.name = name
    //     existingTodo.description = description
    //   }
    // },
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'pending'
    }),
    builder.addCase(fetchTodos.fulfilled, (state, action ) => {
      state.status = 'succeeded'
      // Add any fetched todos to the array
      console.log(initialState)
      console.log(action.payload)
      state.todos = state.todos.concat(action.payload) 
    }),
    builder.addCase(fetchTodos.rejected, (state, action ) => {
      state.status = 'failed'
      state.error = action.payload
    }),
    builder.addCase(addNewTodo.fulfilled, (state, action ) => {
      state.todos.push(action.payload)
    })

    
  },
})

// export const { todoAdded, todoUpdated } = todosSlice.actions

export default todosSlice.reducer

// export const selectTodoById = (state, todoId) =>
//   state.todos.todos.find((todo) => todo.id === todoId)
