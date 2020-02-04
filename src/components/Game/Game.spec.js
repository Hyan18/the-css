import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

describe('Game', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Game />));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});