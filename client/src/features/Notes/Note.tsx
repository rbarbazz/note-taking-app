import React from 'react';

import './Note.scss';

export const Note: React.FC<{ content: string }> = ({ content }) => (
  <p className="note-container">{content}</p>
);
