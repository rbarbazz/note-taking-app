import React from 'react';

import './App.scss';
import { Notepad } from '../features/Notes/Notepad';

const App: React.FC = () => {
  return (
    <div className="App">
      <Notepad />
    </div>
  );
};

export default App;
