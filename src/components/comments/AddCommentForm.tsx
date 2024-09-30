import { Button, TextField } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addComment, changeNewCommentValue } from '../../reducers/comments';

export const AddCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.newCommentValue);

  const handleAdd = () => {
    if (!value) return;
    dispatch(addComment(value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.code === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="add-comment-form">
      <TextField
        multiline
        className="field"
        placeholder="Type here..."
        maxRows={4}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={({ target: { value } }) => dispatch(changeNewCommentValue(value))}
      />
      <Button id="add-button" onClick={handleAdd}>Add</Button>
    </div>
  )
}
