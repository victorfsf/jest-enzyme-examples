import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Lifecycle from 'app/components/Lifecycle';

describe('Lifecycle', () => {
  test('shallow', () => {
    const wrapper = shallow(<Lifecycle type="shallow" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.dive()).toMatchSnapshot();

    wrapper.setProps({
      type: 'shallow (setProps)',
    });
    wrapper.unmount();
  });

  test('mount', () => {
    const wrapper = mount(<Lifecycle type="mount" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.dive).toBeUndefined();

    wrapper.setProps({
      type: 'mount (setProps)',
    });
    wrapper.unmount();
  });

  test('render', () => {
    const wrapper = render(<Lifecycle type="render" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.dive).toBeUndefined();
    expect(wrapper.setProps).toBeUndefined();
    expect(wrapper.unmount).toBeUndefined();
  });
});
