import React from 'react'
import { shallow } from 'enzyme'
import Cell from './Cell'

describe('Cell', () => {
  it('with a state of 0 should have the class Cell0', () => {
    testStateToClass(0)
  })

  it('with a state of 1 should have the class Cell1', () => {
    testStateToClass(1)
  })
})

function testStateToClass (state) {
  const wrapper = shallow(<Cell x={5} y={4} state={state} onClick={jest.fn()}/>)

  expect(wrapper.hasClass(`Cell${state}`)).toBeTruthy()
}
