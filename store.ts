import { configureStore } from '@reduxjs/toolkit'
import todosReducers from './src/features/todos/todosSlice'

const store = configureStore({
    reducer: {
        // reducers
        todos: todosReducers,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch