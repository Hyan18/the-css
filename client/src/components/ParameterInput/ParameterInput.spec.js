import React from 'react'
import { shallow, mount } from 'enzyme'

import ParameterInput from './ParameterInput'

describe('ParameterInput', () => {
  let wrapper
  const methodMock = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <ParameterInput
        parameter="test-parameter"
        prompt="test prompt:"
        buttonText="Submoot"
        func={methodMock}
      />
    )
  })

  it('should have a div container', () => {
    expect(wrapper.find('div.test-parameter-container').length).toBe(1)
  })

  it('should have a labeled input for the parameter', () => {
    expect(wrapper.find('label.test-parameter-label').text()).toBe('test prompt:')
    expect(wrapper.find('input.test-parameter-input').length).toBe(1)
  })

  it('should have a button to act upon changes to parameter', () => {
    expect(wrapper.find('button.test-parameter-button').length).toBe(1)
    expect(wrapper.find('button.test-parameter-button').text()).toBe('Submoot')
  })

  it('should call the method function with the inputed value when button clicked', () => {
    const input = wrapper.find('input.test-parameter-input')
    const button = wrapper.find('button.test-parameter-button')

    input.simulate('change', { target: { value: 'test value' } })
    button.simulate('click')

    expect(methodMock.mock.calls.length).toBe(1)
    expect(methodMock.mock.calls[0][0]).toBe('test value')
  })
})

