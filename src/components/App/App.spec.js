import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import Game from '../Game/Game'

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1)
  })

  it('should render the game component', () => {
    expect(wrapper.containsMatchingElement(<Game />)).toEqual(true)
  })
})
