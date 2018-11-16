import React from 'react';
import { shallow } from 'enzyme';

import Tag from 'components/Tag';

describe('Tag', () => {
  const testTagChange = (wrapper, id, value) => {
    const tagForm = wrapper.dive();
    tagForm.find('input#name').simulate('change', { target: { id, value } });
    return tagForm;
  };

  /* SNAPSHOTS */

  test('renders a tag', () => {
    const wrapper = shallow(<Tag name="test" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders a TagForm when the tag is clicked', () => {
    const wrapper = shallow(<Tag name="test" />);
    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  test('renders a tag with a changed name', () => {
    const wrapper = shallow(<Tag name="test" />);
    wrapper.simulate('click');

    const tagForm = testTagChange(wrapper, 'name', 'this is a new name');
    tagForm.simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(wrapper).toMatchSnapshot();
  });

  /* ENZYME */

  test('renders a TagForm then cancels back to the tag', () => {
    const wrapper = shallow(<Tag name="test" />);
    expect(wrapper.find('button.tag.clickable')).toHaveLength(1);
    expect(wrapper.find('TagForm')).toHaveLength(0);

    wrapper.simulate('click');
    expect(wrapper.find('button.tag.clickable')).toHaveLength(0);
    expect(wrapper.find('TagForm')).toHaveLength(1);

    wrapper.dive().find('button[type="button"]').at(0).simulate('click');
    expect(wrapper.find('button.tag.clickable')).toHaveLength(1);
    expect(wrapper.find('TagForm')).toHaveLength(0);
  });

  test('changes the tag name', () => {
    const wrapper = shallow(<Tag name="test" />);
    wrapper.simulate('click');

    const tagForm = testTagChange(wrapper, 'name', 'this is a new name');
    tagForm.simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(wrapper.state('name')).toEqual('this is a new name');
  });

  test('doesnt change the tag name by passing the wrong id', () => {
    const wrapper = shallow(<Tag name="test" />);
    wrapper.simulate('click');

    const tagForm = testTagChange(
      wrapper,
      'not-name',
      'this is not a new name',
    );
    tagForm.simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(wrapper.state('name')).toEqual('test');
  });

  test('doesnt change the tag name if cancel is clicked', () => {
    const wrapper = shallow(<Tag name="test" />);
    wrapper.simulate('click');

    const tagForm = testTagChange(
      wrapper,
      'name',
      'this was supposed to be a new name',
    );
    tagForm.find('button[type="button"]').at(0).simulate('click');

    expect(wrapper.state('name')).toEqual('test');
  });

  test('doesnt change the tag name if name.length === 0', () => {
    const wrapper = shallow(<Tag name="test" />);
    wrapper.simulate('click');

    const tagForm = testTagChange(wrapper, 'name', '');
    tagForm.simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(wrapper.state('name')).toEqual('test');
  });

  /* MOCKS */

  test('calls the tag\'s submit function if name.length > 0', () => {
    const wrapper = shallow(<Tag name="test" />);
    const mockedSubmit = jest.fn();
    wrapper.instance().handleSubmit = mockedSubmit;
    wrapper.simulate('click');

    const tagForm = testTagChange(wrapper, 'name', 'this is a new name');
    tagForm.simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(mockedSubmit).toHaveBeenCalledTimes(1);
  });

  test('doesnt call the tag\'s submit function if name.length === 0', () => {
    const wrapper = shallow(<Tag name="test" />);
    const mockedSubmit = jest.fn();
    wrapper.instance().handleSubmit = mockedSubmit;
    wrapper.simulate('click');

    const tagForm = testTagChange(wrapper, 'name', '');
    tagForm.simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(mockedSubmit).not.toHaveBeenCalled();
  });
});
