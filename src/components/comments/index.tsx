import { Box, Container, Divider, List, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CommentItem } from './Comment';
import { AddCommentForm } from './AddCommentForm';

const LIMIT = 10;

type P = {
  commentIds: string[];
}

const sliceComments = (page: number, commentIds: string[]) => {
  const start = (page - 1) * LIMIT;
  return commentIds.slice(start, start + LIMIT);
};

export const CommentsList: React.FC<P> = ({ commentIds }) => {
  const [page, setPage] = useState<number>(1);
  const [visibleComments, setVisibleComments] = useState<string[]>(sliceComments(page, commentIds))

  useEffect(() => {
    const newVisibleComments = sliceComments(page, commentIds);
    setVisibleComments(newVisibleComments);
    if (!newVisibleComments.length && page > 1) setPage(page - 1);
  }, [page, commentIds.length])

  return (
    <Box sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
      padding: '10px'
    }}>
      <Typography variant="h5">
        Comments
      </Typography>
      <Container>
        <AddCommentForm />
        {commentIds.length ? (
          <>
            <List>
              {visibleComments.map((commentId, id) => (
                <div key={commentId}>
                  <CommentItem commentId={commentId} />
                  {(id + 1) !== commentIds.length && (
                    <Divider />
                  )}
                </div>
              ))}
            </List>
            <Pagination
              shape="rounded"
              page={page}
              count={Math.ceil(commentIds.length / LIMIT)}
              onChange={(e, page) => setPage(page)}
            />
          </>
        ) : (
          <span className="empty-placeholder">No comments yet.</span>
        )}
      </Container>
    </Box>
  );
}
