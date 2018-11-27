import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Lifecycle from 'app/components/Lifecycle';

describe('Lifecycle', () => {
  /* SHALLOW */

  test('shallow', () => {
    const wrapper = shallow(<Lifecycle type="shallow" />);
    expect(wrapper).toMatchSnapshot();
    // Shallow lets you "dive" into the component
    expect(wrapper.dive()).toMatchSnapshot();

    wrapper.setProps({
      type: 'shallow (setProps)',
    });
    wrapper.unmount();
  });

  /* MOUNT */

  test('mount', () => {
    const wrapper = mount(<Lifecycle type="mount" />);
    expect(wrapper).toMatchSnapshot();
    // Mount renders everything, so you can't use dive
    expect(wrapper.dive).toBeUndefined();

    wrapper.setProps({
      type: 'mount (setProps)',
    });
    wrapper.unmount();
  });

  /* RENDER */

  test('render', () => {
    const wrapper = render(<Lifecycle type="render" />);
    expect(wrapper).toMatchSnapshot();
    // Render renders everything, so you can't use dive
    expect(wrapper.dive).toBeUndefined();
    // Render doesn't care about the lifecycle of the component
    expect(wrapper.setProps).toBeUndefined();
    expect(wrapper.unmount).toBeUndefined();
  });
});
