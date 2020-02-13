import React from 'react'
import { shallow, mount } from 'enzyme'
import Controls from './Controls'

describe('Controls', () => {
  let wrapper
  const playFuncMock = jest.fn()
  const iterateFuncMock = jest.fn()
  const pauseFuncMock = jest.fn()
  const resetFuncMock = jest.fn()
  const unlimitedFuncMock = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Controls
        playFunc={playFuncMock}
        stepFunc={iterateFuncMock}
        pauseFunc={pauseFuncMock}
        resetFunc={resetFuncMock}
        unlimitedFunc={unlimitedFuncMock}
      />
    )
    playFuncMock.mockClear()
    iterateFuncMock.mockClear()
    pauseFuncMock.mockClear()
    resetFuncMock.mockClear()
    unlimitedFuncMock.mockClear()
  })

  describe('iteration controls', () => {
    describeButton('play', 'Play', playFuncMock)

    describeButton('step', 'Step', iterateFuncMock)

    describeButton('pause', 'Pause', pauseFuncMock)

    describeButton('reset', 'Reset', resetFuncMock)

    describeButton('unlimited', 'Unlimited', unlimitedFuncMock)
  })

  function describeButton(buttonName, buttonText, onClickFunc) {
    describe(buttonName, () => {
      let button

      beforeEach(() => {
        button = wrapper.find(`button.${buttonName}-button`)
      })

      it(`should have a ${buttonName} button`, () => {
        expect(button.length).toBe(1)
        expect(button.text()).toBe(buttonText)
      })

      it(`should call the ${buttonName} function when button is clicked`, () => {
        button.simulate('click')
        expect(onClickFunc.mock.calls.length).toBe(1)
      })
    })
  }
})
