import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from './SearchInput';

const setUp = (props = {}) => {
  const component = shallow(<SearchInput {...props} />);
  return component;
};

describe('Header Component', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  describe('Should render without errors', () => {
    it('Should render Form element', () => {
      const elem = component.find('Form');
      expect(elem.length).toBe(1);
    });

    it('Should render InputGroup element', () => {
      const elem = component.find('InputGroup');
      expect(elem.length).toBe(1);
    });

    it('Should render FromControl element', () => {
      const elem = component.find('FormControl');
      expect(elem.length).toBe(1);
    });

    it('Should render Button element', () => {
      const elem = component.find('Button');
      expect(elem.length).toBe(1);
    });
  });

  describe('Should render different UI state', () => {
    it('Should render button disabled', () => {
      const buttonComponent = setUp({ buttonDisabled: true });
      const elem = buttonComponent.find('Button');
      const isDisabled = elem.props().disabled;
      expect(isDisabled).toBe(true);
    });
  });
});
