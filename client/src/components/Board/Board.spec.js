import React from 'react'
import { shallow } from 'enzyme'

import Board from './Board'
import Controls from '../Controls/Controls'

import { findCell } from '../../testHelper'
import axios from 'axios'

jest.mock('axios')
jest.useFakeTimers()
axios.get.mockReturnValue({
  data: [
    { name: 'None', cells: [[0, 0], [0, 0]] },
    { name: 'Map1', cells: [[1, 1], [1, 0]] }
  ]
})

describe('Board', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Board />)
    jest.clearAllTimers()
    setTimeout.mockClear()
    jest.clearAllMocks()
  })

  describe('constructor loading maps', () => {
    it('should load all maps from the API', () => {
      const getSpy = jest.spyOn(axios, 'get')
      shallow(<Board />)

      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][0]).toEqual('/api/maps')
    })

    // it('should have all the maps in the dropdown', () => {
    //   wrapper = mount(<Board />)

    //   setTimeout(() => {
    //     const mapSelect = wrapper.find('.map-select')

    //     expect(mapSelect.find('option').at(0).instance().value).toEqual('None')
    //   }, 100)
    //   jest.runAllTimers()
    // })
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

    it('should render Controls with callbacks', () => {
      const controls = wrapper.find(Controls)
      expect(controls.length).toBe(1)
      expect(controls.props().playFunc).toBe(wrapper.instance().startPlaying)
      expect(controls.props().stepFunc).toBe(wrapper.instance().iterate)
      expect(controls.props().pauseFunc).toBe(wrapper.instance().pause)
      expect(controls.props().resetFunc).toBe(wrapper.instance().reset)
      expect(controls.props().unlimitedFunc).toBe(wrapper.instance().setUnlimited)
      expect(controls.props().saveBoardFunc).toBe(wrapper.instance().saveBoard)
      expect(controls.props().changeBoardSizeFunc).toBe(wrapper.instance().changeBoardSize)
      expect(controls.props().changeGenerationLimitFunc).toBe(wrapper.instance().changeGenerationLimit)
      expect(controls.props().changeClickLimitFunc).toBe(wrapper.instance().changeClickLimit)
    })
  })

  describe('live cell count', () => {
    it('should count number of live cells', () => {
      findCell(wrapper, 0, 0).simulate('click')
      findCell(wrapper, 1, 0).simulate('click')
      findCell(wrapper, 0, 1).simulate('click')

      expect(wrapper.instance().countLiveCells()).toBe(3)
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

        wrapper.instance().iterate()
        expect(findCell(wrapper, 1, 1).prop('state')).toBe(1)
      })

      it('should not iterate over generation limit', () => {
        wrapper.instance().changeGenerationLimit(1)

        wrapper.instance().iterate()

        wrapper.instance().iterate()
        wrapper.instance().iterate()
        wrapper.instance().iterate()

        expect(wrapper.instance().generationCount).toBe(1)
      })
    })

    describe('.changeGenerationLimit', () => {
      it('should change the boards generation limit', () => {
        wrapper.instance().changeGenerationLimit(1)

        wrapper.instance().isPlaying = true
        wrapper.instance().play()

        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(getGenerationCount(wrapper)).toEqual(1)
      })

      describe('.setUnlimited', () => {
        it('should set generation limit to infinity', () => {
          wrapper.instance().changeGenerationLimit(1)
          wrapper.instance().isPlaying = true
          wrapper.instance().setUnlimited()
          wrapper.instance().play()
          jest.runOnlyPendingTimers()
          jest.runOnlyPendingTimers()
          jest.runOnlyPendingTimers()

          expect(getGenerationCount(wrapper)).toEqual(4)
        })
      })
    })

    describe('.changeClickLimit', () => {
      it('should change the boards click limit', () => {
        wrapper.instance().changeClickLimit(1)
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 0, 0).simulate('click')

        expect(wrapper.children().find('.clickCounter').text()).toEqual('Click Count: 1')
      })
    })

    describe('.startPlaying', () => {
      let iterateSpy
      let playSpy

      beforeEach(() => {
        iterateSpy = jest.spyOn(wrapper.instance(), '_iterate')
        playSpy = jest.spyOn(wrapper.instance(), 'play')
      })

      it('should call play', () => {
        wrapper.instance().startPlaying()

        expect(playSpy.mock.calls.length).toBe(1)
      })

      it('should not speed up the iteration rate if called twice', () => {
        wrapper.instance().startPlaying()
        wrapper.instance().startPlaying()

        expect(playSpy.mock.calls.length).toBe(1)
      })

      it('should allow to play after pausing', () => {
        wrapper.instance().startPlaying()
        wrapper.instance().pause()
        wrapper.instance().startPlaying()

        expect(playSpy.mock.calls.length).toBe(2)
      })

      it('iterates continuously', () => {
        wrapper.instance().startPlaying()

        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(iterateSpy.mock.calls.length).toBe(5)
      })

      it('iterates for a specific number of generations', () => {
        wrapper.instance().changeGenerationLimit(1)
        wrapper.instance().startPlaying()

        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(iterateSpy.mock.calls.length).toBe(1)
      })

      describe('.pause', () => {
        it('should stop iteration', () => {
          wrapper.instance().startPlaying() // run once
          jest.runOnlyPendingTimers() // run twice

          wrapper.instance().pause()
          jest.runOnlyPendingTimers()
          jest.runOnlyPendingTimers()

          expect(iterateSpy.mock.calls.length).toBe(2)
        })
      })
    })

    describe('.changeBoardSize', () => {
      it('should resize the board', () => {
        wrapper.instance().changeBoardSize(20)

        const total = 20 * 20
        expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
      })

      it('should reset the board on resize', () => {
        const resetSpy = jest.spyOn(wrapper.instance(), 'reset')

        wrapper.instance().changeBoardSize(20)

        expect(resetSpy.mock.calls.length).toBe(1)
      })
    })

    describe('reset button', () => {
      it('should reset the cells and generation count to zeros', () => {
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 1, 0).simulate('click')
        findCell(wrapper, 0, 1).simulate('click')

        wrapper.instance().iterate()
        wrapper.instance().reset()

        expect(wrapper.instance().state.clickLimit).toBe(Infinity)
        expect(getGenerationCount(wrapper)).toEqual(0)
        expect(getClickCount(wrapper)).toEqual('Click Count: 0')

        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            expect(findCell(wrapper, i, j).prop('state')).toBe(0)
          }
        }
      })

      it('should stop the iteration', () => {
        const iterateSpy = jest.spyOn(wrapper.instance(), '_iterate')
        wrapper.instance().startPlaying()
        wrapper.instance().reset()

        jest.runOnlyPendingTimers()

        expect(iterateSpy.mock.calls.length).toBe(1)
      })

      it('keeps the current board size', () => {
        wrapper.instance().changeBoardSize(20)

        const total = 20 * 20
        wrapper.instance().reset()

        expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
      })
    })
  })

  describe('.loadMap', () => {
    it('should load the selected map', () => {
      expect(findCell(wrapper, 0, 0).prop('state')).toBe(0)
      expect(findCell(wrapper, 1, 0).prop('state')).toBe(0)
      expect(findCell(wrapper, 0, 1).prop('state')).toBe(0)
      expect(findCell(wrapper, 1, 1).prop('state')).toBe(0)

      wrapper.instance().loadMap('Map1')

      const total = 2 * 2
      expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)

      expect(findCell(wrapper, 0, 0).prop('state')).toBe(1)
      expect(findCell(wrapper, 1, 0).prop('state')).toBe(1)
      expect(findCell(wrapper, 0, 1).prop('state')).toBe(1)
      expect(findCell(wrapper, 1, 1).prop('state')).toBe(0)
    })
  })

  describe('.saveBoard', () => {
    it('should post the board current cells with a name', () => {
      findCell(wrapper, 0, 0).simulate('click')
      findCell(wrapper, 1, 1).simulate('click')
      findCell(wrapper, 2, 2).simulate('click')
      findCell(wrapper, 3, 3).simulate('click')
      findCell(wrapper, 4, 4).simulate('click')

      const data = {
        name: 'Gerbils',
        cells: [
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
      }

      const postSpy = jest.spyOn(axios, 'post')

      wrapper.instance().saveBoard('Gerbils')

      expect(postSpy.mock.calls.length).toBe(1)
      expect(postSpy.mock.calls[0][0]).toBe('/api/maps')
      expect(postSpy.mock.calls[0][1]).toEqual(data)
    })

    // it('should make the saved board available', () => {
    //   findCell(wrapper, 0, 0).simulate('click')
    //   findCell(wrapper, 1, 1).simulate('click')
    //   findCell(wrapper, 2, 2).simulate('click')
    //   findCell(wrapper, 3, 3).simulate('click')
    //   findCell(wrapper, 4, 4).simulate('click')

    //   wrapper.instance().saveBoard('Hamlet')

    //   setTimeout(() => {
    //     const mapSelect = wrapper.find('.map-select')
    //     expect(mapSelect.find('option').at(2).instance().value).toBe('Hamlet')
    //   }, 100)
    // })
  })

  describe('clicks', () => {
    it('should increase the click count by 1 on cell click', () => {
      findCell(wrapper, 0, 0).simulate('click')

      expect(wrapper.children().find('.clickCounter').text()).toEqual('Click Count: 1')
    })

    it('should increase the click count by 1 on cell click', () => {
      findCell(wrapper, 0, 0).simulate('click')
      findCell(wrapper, 0, 0).simulate('click')

      expect(wrapper.children().find('.clickCounter').text()).toEqual('Click Count: 2')
    })
  })

  describe('death game', () => {
    it('should display an efficiency score of zero at the start', () => {
      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 0')
    })

    it('should display an efficiency score equal to the product of clicks and generations', () => {
      findCell(wrapper, 1, 1).simulate('click')
      wrapper.instance().iterate()

      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 1')
    })

    it('should stop increasing the death efficiency when the board has been cleared', () => {
      findCell(wrapper, 1, 1).simulate('click')
      wrapper.instance().iterate()
      wrapper.instance().iterate()

      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 1')
    })

    it('should handle multiple generation solutions correctly', () => {
      findCell(wrapper, 1, 1).simulate('click')
      findCell(wrapper, 1, 2).simulate('click')
      findCell(wrapper, 2, 3).simulate('click')
      wrapper.instance().iterate()
      wrapper.instance().iterate()
      wrapper.instance().iterate()

      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 6')
    })

    it('should reset death efficiency when reset', () => {
      findCell(wrapper, 1, 1).simulate('click')
      findCell(wrapper, 1, 2).simulate('click')
      findCell(wrapper, 2, 3).simulate('click')
      wrapper.instance().iterate()
      wrapper.instance().iterate()
      wrapper.instance().iterate()

      wrapper.instance().reset()

      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 0')
    })
  })
})

function getGenerationCount (wrapper) {
  return parseInt(wrapper.children().find('.generationCounter').text().match(/\d+/))
}

function getClickCount (wrapper) {
  return wrapper.children().find('.clickCounter').text()
}
