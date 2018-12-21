import React from 'react';
import ReactDOM from 'react-dom';

import ConnectedTag from 'app/components/ConnectedTag';
// import Tag from 'app/components/Tag';
import './index.css';

ReactDOM.render(
  // <Tag name="Jest & Enzyme examples" />,
  <ConnectedTag name="Jest & Enzyme examples" />,
  document.getElementById('root'),
);
