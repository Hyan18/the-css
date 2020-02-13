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
  const changeBoardSizeFuncMock = jest.fn()
  const changeGenerationLimitFuncMock = jest.fn()

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
      />
    )
    playFuncMock.mockClear()
    iterateFuncMock.mockClear()
    pauseFuncMock.mockClear()
    resetFuncMock.mockClear()
    unlimitedFuncMock.mockClear()
    saveBoardFuncMock.mockClear()
    changeBoardSizeFuncMock.mockClear()
    changeGenerationLimitFuncMock.mockClear()
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
      expect(wrapper.find('label.map-name').text()).toBe('Name:')
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

  describe('resize-board', () => {
    it('should have a input for the board size', () => {
      expect(wrapper.find('label.board-size').text()).toBe('Size:')
      expect(wrapper.find('input.board-size').length).toBe(1)
    })

    it('should have a button to resize the board', () => {
      expect(wrapper.find('button.board-size-button').length).toBe(1)
      expect(wrapper.find('button.board-size-button').text()).toBe('Resize')
    })

    it('should call the change board size method when clicked', () => {
      const input = wrapper.find('input.board-size')
      const button = wrapper.find('button.board-size-button')

      input.simulate('change', { target: { value: '40' } })
      button.simulate('click')

      expect(changeBoardSizeFuncMock.mock.calls.length).toBe(1)
      expect(changeBoardSizeFuncMock.mock.calls[0][0]).toBe(40)
    })
  })

  describe('generation-limit', () => {
    it('should have a input for the generation limit', () => {
      expect(wrapper.find('label.generation-limit').text()).toBe('Generation Limit:')
      expect(wrapper.find('input.generation-limit').length).toBe(1)
    })

    it('should have a button to resize the board', () => {
      expect(wrapper.find('button.generation-limit-button').length).toBe(1)
      expect(wrapper.find('button.generation-limit-button').text()).toBe('Submit')
    })

    it('should call the change board size method when clicked', () => {
      const input = wrapper.find('input.generation-limit')
      const button = wrapper.find('button.generation-limit-button')

      input.simulate('change', { target: { value: '100' } })
      button.simulate('click')

      expect(changeGenerationLimitFuncMock.mock.calls.length).toBe(1)
      expect(changeGenerationLimitFuncMock.mock.calls[0][0]).toBe(100)
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
