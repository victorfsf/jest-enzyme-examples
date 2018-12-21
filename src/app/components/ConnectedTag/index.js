import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import Tag from './Tag';

const store = createStore(reducers);

const ConnectedTag = props => (
  <Provider store={store}>
    <Tag {...props} />
  </Provider>
);

export default ConnectedTag;
