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
  const saveBoardFuncMock = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Controls
        playFunc={playFuncMock}
        stepFunc={iterateFuncMock}
        pauseFunc={pauseFuncMock}
        resetFunc={resetFuncMock}
        unlimitedFunc={unlimitedFuncMock}
        saveBoardFunc={saveBoardFuncMock}
      />
    )
    playFuncMock.mockClear()
    iterateFuncMock.mockClear()
    pauseFuncMock.mockClear()
    resetFuncMock.mockClear()
    unlimitedFuncMock.mockClear()
    saveBoardFuncMock.mockClear()
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

  describe('save board', () => {
    it('should have a input for the map name', () => {
      expect(wrapper.find('input.map-name').length).toBe(1)
    })

    it('should have a button to save the board', () => {
      expect(wrapper.find('button.save-map-button').length).toBe(1)
      expect(wrapper.find('button.save-map-button').text()).toBe('Save')
    })

    it('should call the save board method when clicked', () => {
      const input = wrapper.find('input.map-name')
      const button = wrapper.find('button.save-map-button')

      input.simulate('change', { target: { value: 'Test Map Name' } })
      button.simulate('click')

      expect(saveBoardFuncMock.mock.calls.length).toBe(1)
      expect(saveBoardFuncMock.mock.calls[0][0]).toBe('Test Map Name')
    })
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
