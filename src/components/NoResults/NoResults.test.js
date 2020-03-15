import React from 'react';
import { shallow } from 'enzyme';
import NoResults from './NoResults';

describe('NoResults Component', () => {
  const component = shallow(<NoResults />);

  describe('Should render without errors', () => {
    it('Should render Col element', () => {
      const elem = component.find('Col');
      expect(elem.length).toBe(1);
    });

    it('Should render Paragraph element', () => {
      const elem = component.find('p');
      expect(elem.length).toBe(1);
    });

    it('Should render Button element', () => {
      const elem = component.find('Button');
      expect(elem.length).toBe(1);
    });
  });

  describe('Should render correct text', () => {
    it('Should render No Results text', () => {
      const elem = component.find('p');
      const text = 'Sorry there are no results to show here.';
      expect(elem.text()).toEqual(text);
    });

    it('Should render Button element', () => {
      const elem = component.find('Button');
      const text = 'Refresh';
      expect(elem.text()).toEqual(text);
    });
  });
});
