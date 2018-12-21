import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import ConnectedTag from './Tag';

const store = createStore(reducers);

const TagProvider = props => (
  <Provider store={store}>
    <ConnectedTag {...props} />
  </Provider>
);

export default TagProvider;
