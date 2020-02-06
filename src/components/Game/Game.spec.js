import React from 'react'
import { shallow } from 'enzyme'
import Game from './Game'
import Board from '../Board/Board'

describe('Game', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Game />)
  })

  it('should render a <div />', () => {
    expect(wrapper.find('div')).toBeDefined()
  })

  it('should render the game component', () => {
    expect(wrapper.containsMatchingElement(<Board />)).toEqual(true)
  })
})
