import React from 'react'
import { shallow, mount } from 'enzyme'
import Board from './Board'
import { findCell } from '../../testHelper'

jest.useFakeTimers()

describe('Board', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Board />)
    jest.clearAllTimers()
    setTimeout.mockClear()
  })

  describe('.render', () => {
    it('should render a <div />', () => {
      expect(wrapper.find('.board-div')).toBeDefined()
      expect(wrapper.find('.board-div').length).toEqual(1)
    })

    it('should render a 10x10 grid', () => {
      const total = 10 * 10
      expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
    })
  })

  describe('grid interaction', () => {
    it('should turn a cell to alive', () => {
      findCell(wrapper, 0, 0).simulate('click')

      expect(findCell(wrapper, 0, 0).prop('state')).toBe(1)
    })
  })

  describe('controls', () => {
    describe('iterate button', () => {
      it('should iterate', () => {
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 1, 0).simulate('click')
        findCell(wrapper, 0, 1).simulate('click')

        expect(findCell(wrapper, 1, 1).prop('state')).toBe(0)

        clickButton(wrapper, 'iterate')
        expect(findCell(wrapper, 1, 1).prop('state')).toBe(1)
      })
    })

    describe('.play', () => {
      it('iterates continuously', () => {
        const board = new Board()
        const mockIterate = jest.fn()
        const playSpy = jest.spyOn(board, 'play')

        board.isPlaying = true
        board.play(mockIterate)

        expect(mockIterate.mock.calls.length).toBe(1)

        expect(setTimeout.mock.calls.length).toBe(1)
        expect(setTimeout.mock.calls[0][1]).toBe(100)

        expect(playSpy.mock.calls.length).toBe(1)
        jest.runOnlyPendingTimers()
        expect(playSpy.mock.calls.length).toBe(2)
        expect(mockIterate.mock.calls.length).toBe(2)
      })
    })

    describe('play/pause buttons', () => {
      let playSpy

      beforeEach(() => {
        playSpy = jest.spyOn(wrapper.instance(), 'play')
      })

      it('click play should call play', () => {
        clickButton(wrapper, 'play')

        expect(playSpy.mock.calls.length).toBe(1)
      })

      it('pressing play twice should not speed up the iteration rate', () => {
        clickButton(wrapper, 'play')
        clickButton(wrapper, 'play')

        expect(playSpy.mock.calls.length).toBe(1)
      })

      it('should allow to play after pausing', () => {
        clickButton(wrapper, 'play')
        clickButton(wrapper, 'pause')
        clickButton(wrapper, 'play')

        expect(playSpy.mock.calls.length).toBe(2)
      })
    })

    describe('resizing form', () => {
      it('should resize the board', () => {
        wrapper = mount(<Board />)
        const form = wrapper.find('form')
        const input = wrapper.find('input').at(0)

        input.instance().value = 20
        form.simulate('submit')

        const total = 20 * 20
        expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
      })
    })

    describe('reset button', () => {
      it('should reset the cells and generation count to zeros', () => {
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 1, 0).simulate('click')
        findCell(wrapper, 0, 1).simulate('click')

        clickButton(wrapper, 'iterate')
        clickButton(wrapper, 'reset')

        expect(getGenerationCount(wrapper)).toEqual(0)

        for(let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            expect(findCell(wrapper, i, j).prop('state')).toBe(0)
          }
        }
      })

      it('clicking reset after play stops the iteration', () => {
        clickButton(wrapper, 'play')
        clickButton(wrapper, 'reset')

        jest.runOnlyPendingTimers()

        expect(setTimeout.mock.calls.length).toBe(1)
      })
    })
  })
})

function getGenerationCount (wrapper) {
  return parseInt(wrapper.children().find('.generationCounter').text())
}

function clickButton (wrapper, action) {
  wrapper.find(`.${action}-button`).simulate('click')
}
