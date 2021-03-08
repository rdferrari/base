import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../store'

// Define a type for the slice state
interface Posts {
  [index: number]: {id: string, title: string, content: string},
}

// Define the initial state using that type
const initialState: Posts = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { postAdded } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectPosts = (state: RootState) => state.posts.id

export default postsSlice.reducer