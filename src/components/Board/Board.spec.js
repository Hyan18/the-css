import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Board from './Board'

describe('Board', () => {

  const wrapper = shallow(<Board />)

  it('should render a <div />', () => {
    expect(wrapper.find('.board-div')).toBeDefined()
    expect(wrapper.find('.board-div').length).toEqual(1)
  });

  it('should render a 10x10 grid', () => {
    const wrapper = shallow(<Board />)
    const total = 10 * 10

    expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
  })

  it('should turn a cell to alive', () => {
    const wrapper = shallow(<Board />)

    let cell = wrapper.children().find('Cell').findWhere(n => n.prop('x') === 0 && n.prop('y') === 0)

    cell.simulate('click')
    cell = wrapper.children().find('Cell').findWhere(n => n.prop('x') === 0 && n.prop('y') === 0)
    expect(cell.prop('state')).toBe(1)
  })

  it('should iterate', () => {
    const wrapper = shallow(<Board />)

    wrapper.children().find('Cell').findWhere(n => n.prop('x') === 0 && n.prop('y') === 0).simulate('click')
    wrapper.children().find('Cell').findWhere(n => n.prop('x') === 1 && n.prop('y') === 0).simulate('click')
    wrapper.children().find('Cell').findWhere(n => n.prop('x') === 0 && n.prop('y') === 1).simulate('click')

    expect(wrapper
      .children()
      .find('Cell')
      .findWhere(n => n.prop('x') === 1 && n.prop('y') === 1)
      .prop('state')
    ).toBe(0)
    wrapper.find('.button').simulate('click')
    expect(wrapper
      .children()
      .find('Cell')
      .findWhere(n => n.prop('x') === 1 && n.prop('y') === 1)
      .prop('state')
    ).toBe(1)
  })

})
