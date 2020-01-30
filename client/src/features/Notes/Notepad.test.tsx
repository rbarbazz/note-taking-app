import { render } from '@testing-library/react';
import React from 'react';

import { Notepad } from './Notepad';

test('renders learn react link', () => {
  const { getByText } = render(<Notepad />);
  const addBtn = getByText(/add/i);

  expect(addBtn).toBeInTheDocument();
});
