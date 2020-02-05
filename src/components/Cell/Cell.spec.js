import React from 'react'
import { shallow } from 'enzyme'
import Cell from './Cell'

describe('Cell', () => {

  it('with a state of 0 should have the class Cell0', () => {
    const wrapper = shallow(<Cell x={4} y={5} state={0}/>)

    expect(wrapper.hasClass('Cell0')).toBeTruthy()
  })

  it('with a state of 1 should have the class Cell1', () => {
    const wrapper = shallow(<Cell x={5} y={4} state={1}/>)

    expect(wrapper.hasClass('Cell1')).toBeTruthy()
  })

})
