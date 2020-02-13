import React from 'react'
import { shallow } from 'enzyme'
import Controls from './Controls'
import ParameterInput from '../ParameterInput/ParameterInput'

describe('Controls', () => {
  let wrapper
  const playFuncMock = jest.fn()
  const iterateFuncMock = jest.fn()
  const pauseFuncMock = jest.fn()
  const resetFuncMock = jest.fn()
  const unlimitedFuncMock = jest.fn()
  const saveBoardFuncMock = jest.fn()
  const changeBoardSizeFuncMock = jest.fn()
  const changeGenerationLimitFuncMock = jest.fn()
  const changeClickLimitFuncMock = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Controls
        playFunc={playFuncMock}
        stepFunc={iterateFuncMock}
        pauseFunc={pauseFuncMock}
        resetFunc={resetFuncMock}
        unlimitedFunc={unlimitedFuncMock}
        saveBoardFunc={saveBoardFuncMock}
        changeBoardSizeFunc={changeBoardSizeFuncMock}
        changeGenerationLimitFunc={changeGenerationLimitFuncMock}
        changeClickLimitFunc={changeClickLimitFuncMock}
      />
    )
  })

  it('should have a controls-container div', () => {
    expect(wrapper.find('div.controls-container').length).toBe(1)
  })

  describe('iteration controls', () => {
    it('should have an iteration-container', () => {
      expect(wrapper
        .find('div.controls-container')
        .find('div.iteration-container')
        .length).toBe(1)
    })

    describeButton('play', 'Play', playFuncMock)

    describeButton('step', 'Step', iterateFuncMock)

    describeButton('pause', 'Pause', pauseFuncMock)

    describeButton('reset', 'Reset', resetFuncMock)

    describeButton('unlimited', 'Unlimited', unlimitedFuncMock)
  })

  describeParameterInput('save-board', 'Name:', 'Save', saveBoardFuncMock)

  describeParameterInput('board-size', 'Size:', 'Resize', changeBoardSizeFuncMock)

  describeParameterInput('generation-limit', 'Generation Limit:', 'Set', changeGenerationLimitFuncMock)

  describeParameterInput('click-limit', 'Click Limit:', 'Set', changeClickLimitFuncMock)

  function describeButton (buttonName, buttonText, onClickFunc) {
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

  function describeParameterInput (parameter, promptText, buttonText, func) {
    it(`should have a ${parameter} parameter input`, () => {
      const input = wrapper.find(ParameterInput)
        .findWhere(n => n.props().parameter === parameter)
      expect(input.length).toBe(1)
      expect(input.props().prompt).toBe(promptText)
      expect(input.props().buttonText).toBe(buttonText)
      expect(input.props().func).toBe(func)
    })
  }
})
