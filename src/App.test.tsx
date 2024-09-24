import React from 'react';
import { fireEvent, queryByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from './main';

const commentText = 'test';

test('Add comment', () => {
  render(<Main />);
  const textArea = screen.getByPlaceholderText('Type here...');
  fireEvent.change(textArea, { target: { value: commentText } });
  const addButton = document.querySelector('#add-button')!;
  userEvent.click(addButton);
  expect(screen.getByText(commentText)).toBeInTheDocument();
});

test('Delete comment', async () => {
  render(<Main />);
  const comment = document.querySelector('#comment-text')?.innerHTML!;
  const deleteButton = document.querySelector('[aria-label="delete"]')!;
  userEvent.click(deleteButton);
  expect(await screen.getByText(comment)).not.toBeInTheDocument();
});
