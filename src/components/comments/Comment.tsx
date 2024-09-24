import { IconButton, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DeleteOutline, FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { deleteComment, likeComment } from '../../reducers/comments';

type P = {
  commentId: string;
}

export const CommentItem: React.FC<P> = ({ commentId }) => {
  const dispatch = useAppDispatch();
  const comment = useAppSelector(state => state.byId[commentId]);

  const handleLike = () => dispatch(likeComment(commentId));
  const handleDelete = () => dispatch(deleteComment(commentId));

  if (!comment) return null;

  return (
    <ListItem
      secondaryAction={
        <div className="comment-actions">
          {comment.likes}
          <IconButton aria-label="like" onClick={handleLike}>
            {comment.liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteOutline />
          </IconButton>
        </div>
      }
    >
      <ListItemText
        primary={comment.user.fullName}
        secondary={
          <React.Fragment>
            <span id="comment-text">{comment.body}</span>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
