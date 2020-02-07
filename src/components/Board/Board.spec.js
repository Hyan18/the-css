import React from 'react'
import { shallow } from 'enzyme'
import Board from './Board'
import { findCell } from '../../testHelper'

describe('Board', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Board />)
  })

  it('should render a <div />', () => {
    expect(wrapper.find('.board-div')).toBeDefined()
    expect(wrapper.find('.board-div').length).toEqual(1)
  })

  it('should render a 10x10 grid', () => {
    const total = 10 * 10

    expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
  })

  it('should turn a cell to alive', () => {
    let cell = findCell(wrapper, 0, 0)

    cell.simulate('click')
    cell = findCell(wrapper, 0, 0)
    expect(cell.prop('state')).toBe(1)
  })

    // it('should iterate', () => {
    //   findCell(wrapper, 0, 0).simulate('click')
    //   findCell(wrapper, 1, 0).simulate('click')
    //   findCell(wrapper, 0, 1).simulate('click')

    //   expect(findCell(wrapper, 1, 1).prop('state')).toBe(0)
    //   wrapper.find('.button').simulate('click')
    //   expect(findCell(wrapper, 1, 1).prop('state')).toBe(1)
    // })
})
