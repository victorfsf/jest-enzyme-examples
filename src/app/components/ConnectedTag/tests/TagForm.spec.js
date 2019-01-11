import React from 'react';

import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import TagForm from 'app/components/ConnectedTag/TagForm';

const mockStore = configureMockStore();

describe('TagForm', () => {
  test('calls CHANGE_NAME and TOGGLE_FORM when the tag name is changed', () => {
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <TagForm name="test" />
      </Provider>,
    );

    expect(store.getActions()).toEqual([]);
    wrapper.find('input').simulate('change', { target: { value: 'new name' } });
    wrapper.simulate('submit');
    expect(store.getActions()).toEqual([
      { type: 'CHANGE_NAME', name: 'new name' },
      { type: 'TOGGLE_FORM' },
    ]);
  });

  test('doesnt call CHANGE_NAME/TOGGLE_FORM when the form is invalid', () => {
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <TagForm />
      </Provider>,
    );
    expect(store.getActions()).toEqual([]);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    wrapper.simulate('submit');
    expect(store.getActions()).toEqual([]);
  });

  test('calls TOGGLE_FORM when cancel is clicked', () => {
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <TagForm />
      </Provider>,
    );

    expect(store.getActions()).toEqual([]);
    wrapper.find('button').at(0).simulate('click');
    expect(store.getActions()).toEqual([
      { type: 'TOGGLE_FORM' },
    ]);
  });
});
