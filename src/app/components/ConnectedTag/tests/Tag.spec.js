import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Tag from 'app/components/ConnectedTag/Tag';

import reducers from '../reducers';

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

  test('renders a Tag with the name set by the store state', () => {
    // mockStore can't be used here because reducers wouldn't work with redux-mock-store.
    const store = createStore(reducers, { tag: { name: 'test1' } });
    const wrapper = mount(
      <Provider store={store}>
        <Tag name="test" />
      </Provider>,
    );
    expect(wrapper.find('button').text()).toEqual('test1');
  });

  test('renders a TagForm when isFormOpen is true', () => {
    // mockStore can't be used here because reducers wouldn't work with redux-mock-store.
    const store = createStore(reducers, { tag: { isFormOpen: true } });
    const wrapper = mount(
      <Provider store={store}>
        <Tag name="test" />
      </Provider>,
    );
    expect(wrapper.find('TagForm')).toHaveLength(1);
  });
});
