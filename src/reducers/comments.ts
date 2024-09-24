import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string;
  username: string;
  fullName: string;
}

export interface Comment {
  id: string;
  body: string;
  postId: string;
  likes: number;
  liked?: boolean;
  user: User;
}

interface Result<T> {
  comments: T[];
  limit: number;
  skip: number;
  total: number;
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byId: {} as { [commentId: string]: Comment },
    newCommentValue: '',
  },
  reducers: {
    findComments: (state, action: PayloadAction<Result<Comment>>) => {
      const { comments } = action.payload;
      state.byId = comments.reduce((res, comment) => ({ ...res, [comment.id]: comment }), {})
    },
    likeComment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const comment = state.byId[id];
      state.byId[id] = {
        ...comment,
        likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
        liked: !comment.liked
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.byId[id];
    },
    addComment: (state, action: PayloadAction<string>) => {
      const id = Date.now().toString();
      state.newCommentValue = '';
      state.byId = {
        [id]: {
          id,
          body: action.payload,
          likes: 0,
          postId: id,
          user: {
            id,
            username: 'user',
            fullName: 'User'
          }
        },
        ...state.byId
      }
    },
    changeNewCommentValue: (state, action: PayloadAction<string>) => {
      state.newCommentValue = action.payload
    }
  }
})

export const { findComments, likeComment, deleteComment, changeNewCommentValue, addComment } = commentsSlice.actions

export default commentsSlice.reducer
