import React from 'react';
import ReactDOM from 'react-dom';
import RestSignup from './RestSignup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
