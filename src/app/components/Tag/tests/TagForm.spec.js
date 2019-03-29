import React from 'react';
import { shallow } from 'enzyme';

import TagForm from 'app/components/Tag/TagForm';
import * as utils from 'app/utils';

describe('TagForm (Snapshots)', () => {
  test('renders a form', () => {
    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn().mockName('mockedOnSubmit')}
      onCancel={jest.fn().mockName('mockedOnCancel')}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TagForm (Mocks)', () => {
  test('calls onCancel when ✖ is clicked', () => {
    const mockedOnCancel = jest.fn();

    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn()}
      onCancel={mockedOnCancel}
    />);

    wrapper.find('button[type="button"]').at(0).simulate('click');
    expect(mockedOnCancel).toHaveBeenCalledTimes(1);
  });

  test('calls onCancel when the form is submitted', () => {
    const mockedOnCancel = jest.fn();

    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn()}
      onCancel={mockedOnCancel}
    />);

    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(mockedOnCancel).toHaveBeenCalledTimes(1);
  });

  test('calls onSubmit when the form is submitted and name.length > 0', () => {
    const mockedOnSubmit = jest.fn();
    const mockedPreventDefault = jest.fn();

    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={mockedOnSubmit}
      onCancel={jest.fn()}
    />);

    wrapper.find('form').simulate('submit', {
      preventDefault: mockedPreventDefault,
    });
    expect(mockedPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
  });

  test('doesnt call onSubmit/onCancel when the form is submitted and name.length === 0', () => {
    const mockedOnSubmit = jest.fn();
    const mockedOnCancel = jest.fn();
    const mockedPreventDefault = jest.fn();

    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={mockedOnSubmit}
      onCancel={mockedOnCancel}
    />);

    wrapper.find('input#name').simulate('change', {
      target: {
        id: 'name',
        value: '',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault: mockedPreventDefault,
    });
    expect(mockedPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockedOnSubmit).not.toHaveBeenCalled();
    expect(mockedOnCancel).not.toHaveBeenCalled();
  });

  test('calls this.handleChange when the input changes', () => {
    const mockedHandleChange = jest.fn();

    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn()}
      onCancel={jest.fn()}
    />);
    wrapper.instance().handleChange = mockedHandleChange;

    ['new value', 'another new value', 'last new value'].forEach((value) => {
      wrapper.find('input#name').simulate('change', {
        target: {
          id: 'name',
          value,
        },
      });
    });
    expect(mockedHandleChange).toHaveBeenCalledTimes(3);
  });

  test('calls handleChange 5 times with different arguments each time', () => {
    const mockedHandleChange = jest.fn();

    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn()}
      onCancel={jest.fn()}
    />);
    wrapper.instance().handleChange = mockedHandleChange;

    const values = [
      'new value 1', 'new value 2', 'new value 3', 'new value 4', 'new value 5',
    ];
    values.forEach((value) => {
      wrapper.find('input#name').simulate('change', {
        target: {
          id: 'name',
          value,
        },
      });
    });

    expect(mockedHandleChange).toHaveBeenCalledTimes(5);

    const { calls } = mockedHandleChange.mock;
    expect(calls).toHaveLength(5);

    calls.forEach((call, i) => (
      expect(call).toEqual([
        { target: { id: 'name', value: values[i] } },
      ])
    ));
  });

  test('tag form\'s value changes before onSubmit is called', () => {
    const mockedHandleSubmit = jest.fn();
    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn()}
      onCancel={jest.fn()}
    />);
    wrapper.instance().handleSubmit = mockedHandleSubmit;

    wrapper.find('input#name').simulate('change', {
      target: {
        id: 'name',
        value: 'new value',
      },
    });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(mockedHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockedHandleSubmit.mock.instances).toHaveLength(1);
    expect(mockedHandleSubmit.mock.instances[0].state.value).toEqual('new value');
  });

  test('calls validateString when submitting the form', () => {
    const mockedValidateString = jest.spyOn(utils, 'validateString');

    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn()}
      onCancel={jest.fn()}
    />);
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(mockedValidateString).toHaveBeenCalledTimes(1);
    mockedValidateString.mockRestore();
  });

  test('doesnt submit the form when validateString returns false', () => {
    const mockedValidateString = jest.spyOn(utils, 'validateString').mockReturnValue(false);
    const mockedOnSubmit = jest.fn();
    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={mockedOnSubmit}
      onCancel={jest.fn()}
    />);
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(mockedValidateString).toHaveBeenCalledTimes(1);
    expect(mockedOnSubmit).not.toHaveBeenCalled();
    mockedValidateString.mockRestore();
  });

  test('doesnt call onCancel when validateString returns false', () => {
    const mockedValidateString = jest.spyOn(utils, 'validateString').mockReturnValue(false);
    const mockedOnCancel = jest.fn();
    const wrapper = shallow(<TagForm
      name="test"
      onSubmit={jest.fn()}
      onCancel={mockedOnCancel}
    />);
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(mockedValidateString).toHaveBeenCalledTimes(1);
    expect(mockedOnCancel).not.toHaveBeenCalled();
    mockedValidateString.mockRestore();
  });
});
