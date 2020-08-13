import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import React from 'react';

import { Notepad } from './Notepad';
import reducers from '../../app/rootReducer';

const Store: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({
  children,
}) => {
  const store = createStore(reducers);

  return <Provider store={store}>{children}</Provider>;
};

test('renders Notepad', () => {
  const { getByText } = render(
    <Store>
      <Notepad />
    </Store>,
  );
  const addBtn = getByText(/add/i);

  expect(addBtn).toBeInTheDocument();
});
