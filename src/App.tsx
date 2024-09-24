import React, { useEffect } from 'react';
import { findComments } from './reducers/comments';
import { useAppDispatch, useAppSelector } from './hooks';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CommentsList } from './components/comments';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.byId);

  const fetchComments = async () => {
    if (Object.keys(comments).length) return;

    const response = await fetch('https://dummyjson.com/comments');
    const result = await response.json();
    dispatch(findComments(result));
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CommentsList commentIds={Object.keys(comments)} />
    </ThemeProvider>
  );
}

export default App;
