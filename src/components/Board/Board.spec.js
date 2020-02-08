import React from 'react'
import { shallow } from 'enzyme'
import Board from './Board'
import { findCell } from '../../testHelper'

describe('Board', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Board />)
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

  describe('iteration controls', () => {
    describe('iterate button', () => {
      it('should iterate', () => {
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 1, 0).simulate('click')
        findCell(wrapper, 0, 1).simulate('click')

        expect(findCell(wrapper, 1, 1).prop('state')).toBe(0)

        wrapper.find('.iterate-button').simulate('click')
        expect(findCell(wrapper, 1, 1).prop('state')).toBe(1)
      })
    })

    describe('play/pause buttons', () => {
      describe('.play', () => {
        it('iterates continuously', () => {
          const board = new Board()
          const mockSetTimeout = jest.fn()
          const mockIterate = jest.fn()
          board.play(mockSetTimeout, mockIterate)
          expect(mockSetTimeout.mock.calls.length).toBe(1)
          expect(mockSetTimeout.mock.calls[0][1]).toBe(100)
          expect(mockIterate.mock.calls.length).toBe(1)
        })
      })

      it('should update the generation counter to ~20', (done) => {
        wrapper.find('.play-button').simulate('click')

        setTimeout(() => {
          wrapper.find('.pause-button').simulate('click')

          const generationCount1 = getGenerationCount(wrapper)

          expect(generationCount1).toBeGreaterThanOrEqual(18)
          expect(generationCount1).toBeLessThan(21)

          setTimeout(() => {
            expect(getGenerationCount(wrapper)).toEqual(generationCount1)

            done()
          }, 300)
        }, 2000)
      })

      it('should update the generation counter to ~12', (done) => {
        wrapper.find('.play-button').simulate('click')

        setTimeout(() => {
          wrapper.find('.pause-button').simulate('click')

          const generationCount1 = getGenerationCount(wrapper)

          expect(generationCount1).toBeGreaterThanOrEqual(11)
          expect(generationCount1).toBeLessThan(13)

          setTimeout(() => {
            expect(getGenerationCount(wrapper)).toEqual(generationCount1)
            done()
          }, 500)
        }, 1200)
      })

      it('should allow to play after pausing', () => {
        wrapper.find('.play-button').simulate('click')
        wrapper.find('.pause-button').simulate('click')

        const generationCount1 = getGenerationCount(wrapper)

        wrapper.find('.play-button').simulate('click')
        wrapper.find('.pause-button').simulate('click')
        expect(getGenerationCount(wrapper)).toBeGreaterThan(generationCount1)
      })
    })

    describe('reset button', () => {
      it('should reset the cells and generation count to zeros', () => {
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 1, 0).simulate('click')
        findCell(wrapper, 0, 1).simulate('click')

        wrapper.find('.iterate-button').simulate('click')

        expect(getGenerationCount(wrapper)).toEqual(1)
        expect(findCell(wrapper, 1, 1).prop('state')).toEqual(1)

        wrapper.find('.reset-button').simulate('click')

        expect(getGenerationCount(wrapper)).toEqual(0)

        expect(findCell(wrapper, 0, 0).prop('state')).toEqual(0)
        expect(findCell(wrapper, 1, 0).prop('state')).toEqual(0)
        expect(findCell(wrapper, 0, 1).prop('state')).toEqual(0)
        expect(findCell(wrapper, 1, 1).prop('state')).toEqual(0)
      })

      it('clicking reset after play stops the iteration', (done) => {
        wrapper.find('.play-button').simulate('click')
        wrapper.find('.reset-button').simulate('click')

        setTimeout(() => {
          expect(getGenerationCount(wrapper)).toBe(0)
          done()
        }, 500)
      })
    })
  })
})

function getGenerationCount (wrapper) {
  return parseInt(wrapper.children().find('.generationCounter').text())
}
