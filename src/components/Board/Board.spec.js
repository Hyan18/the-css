import React from 'react'
import { shallow, mount } from 'enzyme'
import Board from './Board'

describe('Board', () => {

  const wrapper = shallow(<Board />)

  it('should render a <div />', () => {
    expect(wrapper.find('.board-div')).toBeDefined()
    expect(wrapper.find('.board-div').length).toEqual(1)
  });

  it('should render a 10x10 empty grid', () => {
    const wrapper = shallow(<Board />)

    expect(wrapper.children('.Cell0').length).toEqual(100)
  })
})
