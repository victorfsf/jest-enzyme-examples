import React from 'react';

import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import reducers from '../reducers';

import Tag from 'app/components/ConnectedTag/Tag';

const mockStore = configureMockStore();

describe('Tag', () => {
  test('calls TOGGLE_FORM when the tag is clicked', () => {
    const store = mockStore({
      tag: {
        isFormOpen: false,
        name: 'test1',
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Tag />
      </Provider>,
    );
    expect(store.getActions()).toEqual([]);
    wrapper.find('button').at(0).simulate('click');
    expect(store.getActions()).toEqual([
      { type: 'TOGGLE_FORM' },
    ]);

    wrapper.find('button').at(0).simulate('click');
    expect(store.getActions()).toEqual([
      { type: 'TOGGLE_FORM' },
      { type: 'TOGGLE_FORM' },
    ]);
  });
});
