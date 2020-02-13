import React from 'react'
import { shallow, mount } from 'enzyme'
import Board from './Board'
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

    it('should have all the maps in the dropdown', () => {
      wrapper = mount(<Board />)

      setTimeout(() => {
        const mapSelect = wrapper.find('.map-select')

        expect(mapSelect.find('option').at(0).instance().value).toEqual('None')
      }, 100)
    })
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

        clickButton(wrapper, 'iterate')
        expect(findCell(wrapper, 1, 1).prop('state')).toBe(1)
      })

      it('should not iterate over generation limit', () => {
        clickButton(wrapper, 'iterate')

        wrapper.instance().generationLimit = 1

        clickButton(wrapper, 'iterate')
        clickButton(wrapper, 'iterate')
        clickButton(wrapper, 'iterate')

        expect(wrapper.instance().generationCount).toBe(1)
      })

      it('generation limit input should gain focus', () => {
        const wrapper = mount(<Board/>)
        const focusSpy = jest.spyOn(wrapper.instance(), 'clickToSetLimit')

        wrapper.instance().clickToSetLimit()

        expect(focusSpy).toHaveBeenCalled()
      })

      it('size should gain focus', () => {
        const wrapper = mount(<Board/>)
        const focusSpy = jest.spyOn(wrapper.instance(), 'clickToResize')

        wrapper.instance().clickToResize()

        expect(focusSpy).toHaveBeenCalled()
      })
    })

    describe('generation', () => {
      it('form should change the boards generation limit', () => {
        wrapper = mount(<Board />)

        const form = wrapper.find('.set-generation-limit')
        const input = form.find('input').at(0)

        input.instance().value = 1
        form.simulate('submit')

        wrapper.instance().isPlaying = true
        wrapper.instance().play()

        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(getGenerationCount(wrapper)).toEqual(1)
      })

      describe('.setUnlimited', () => {
        it('should set limit to unlimited', () => {
          const wrapper = mount(<Board />)

          wrapper.instance().setUnlimited()

          const genLimit = wrapper.children().find('.generationLimit').text()
          expect(genLimit).toMatch('No limit')
        })
      })

      it('clicking unlimited sets generation limit to infinity', () => {
        wrapper = mount(<Board />)
        const form = wrapper.find('form').at(1)
        const input = wrapper.find('input').at(2)

        input.instance().value = 1
        form.simulate('submit')
        wrapper.instance().isPlaying = true
        clickButton(wrapper, 'unlimited')
        wrapper.instance().play()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(getGenerationCount(wrapper)).toEqual(4)
      })
    })

    describe('limitClick form', () => {
      it('should change the boards click limit', () => {
        wrapper = mount(<Board />)
        const form = wrapper.find('Form').findWhere(n => n.prop('name') === 'click')
        const clickLimitInput = form.find('input').at(0)

        clickLimitInput.instance().value = 1
        form.simulate('submit')
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 0, 0).simulate('click')

        expect(wrapper.children().find('.clickCounter').text()).toEqual('Click Count: 1')
      })
    })

    describe('.play', () => {
      it('iterates continuously', () => {
        const playSpy = jest.spyOn(wrapper.instance(), 'play')
        const iterateSpy = jest.spyOn(wrapper.instance(), 'iterate')

        clickButton(wrapper, 'play')

        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(getGenerationCount(wrapper)).toEqual(5)
        expect(playSpy.mock.calls.length).toBe(5)
        expect(iterateSpy.mock.calls.length).toBe(5)
      })

      it('iterates for a specific number of generations', () => {
        wrapper.instance().isPlaying = true
        wrapper.instance().generationLimit = 1
        wrapper.instance().play()

        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        expect(getGenerationCount(wrapper)).toEqual(1)
      })
    })

    describe('play/pause buttons', () => {
      let playSpy

      beforeEach(() => {
        playSpy = jest.spyOn(wrapper.instance(), 'play')
      })

      it('click play should call play', () => {
        wrapper.find('.play-button').simulate('click')
        clickButton(wrapper, 'play')

        // console.log(wrapper.find(`.fa-play-circle`).debug())
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
        const form = wrapper.find('.resize-board')
        const input = form.find('input').at(0)

        input.instance().value = 20
        form.simulate('submit')

        const total = 20 * 20
        expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
      })

      it('should reset the board on resize', () => {
        wrapper = mount(<Board />)

        const resetSpy = jest.spyOn(wrapper.instance(), 'reset')

        const form = wrapper.find('.resize-board')
        const input = form.find('input').at(0)

        input.instance().value = 20
        form.simulate('submit')

        expect(resetSpy.mock.calls.length).toBe(1)
      })
    })

    describe('reset button', () => {
      it('should reset the cells and generation count to zeros', () => {
        findCell(wrapper, 0, 0).simulate('click')
        findCell(wrapper, 1, 0).simulate('click')
        findCell(wrapper, 0, 1).simulate('click')

        clickButton(wrapper, 'iterate')
        clickButton(wrapper, 'reset')

        expect(wrapper.instance().state.clickLimit).toBe(Infinity)
        expect(getGenerationCount(wrapper)).toEqual(0)
        expect(getClickCount(wrapper)).toEqual('Click Count: 0')

        for (let i = 0; i < 2; i++) {
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

      it('clicking reset keeps the current board size', () => {
        wrapper = mount(<Board />)
        const form = wrapper.find('.resize-board')
        const input = form.find('input').at(0)

        input.instance().value = 20

        form.simulate('submit')

        const total = 20 * 20

        clickButton(wrapper, 'reset')
        expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
      })
    })
  })

  describe('load map', () => {
    it('should load the selected map', () => {
      wrapper = mount(<Board />)

      expect(findCell(wrapper, 0, 0).prop('state')).toBe(0)
      expect(findCell(wrapper, 1, 0).prop('state')).toBe(0)
      expect(findCell(wrapper, 0, 1).prop('state')).toBe(0)
      expect(findCell(wrapper, 1, 1).prop('state')).toBe(0)

      setTimeout(() => {
        const mapSelect = wrapper.find('.map-select')

        mapSelect.simulate('change', { target: { value: 'Map1' } })
        clickButton(wrapper, 'map-submit')

        const total = 2 * 2
        expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)

        expect(findCell(wrapper, 0, 0).prop('state')).toBe(1)
        expect(findCell(wrapper, 1, 0).prop('state')).toBe(1)
        expect(findCell(wrapper, 0, 1).prop('state')).toBe(1)
        expect(findCell(wrapper, 1, 1).prop('state')).toBe(0)
      }, 100)
    })
  })

  describe('save map', () => {
    it('should post the board current cells with a name', () => {
      wrapper = mount(<Board />)

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

      const form = wrapper.find('.save-board')
      form.find('input').at(0).simulate('change', { target: { value: 'Gerbils' } })
      form.simulate('submit')

      expect(postSpy.mock.calls.length).toBe(1)
      expect(postSpy.mock.calls[0][0]).toBe('/api/maps')
      expect(postSpy.mock.calls[0][1]).toEqual(data)
    })

    it('should make the saved board available', () => {
      wrapper = mount(<Board />)

      findCell(wrapper, 0, 0).simulate('click')
      findCell(wrapper, 1, 1).simulate('click')
      findCell(wrapper, 2, 2).simulate('click')
      findCell(wrapper, 3, 3).simulate('click')
      findCell(wrapper, 4, 4).simulate('click')

      const form = wrapper.find('.save-board')
      form.find('input').at(0).simulate('change', { target: { value: 'Hamlet' } })
      form.simulate('submit')

      setTimeout(() => {
        const mapSelect = wrapper.find('.map-select')
        expect(mapSelect.find('option').at(2).instance().value).toBe('Hamlet')
      }, 100)
    })
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
      clickButton(wrapper, 'iterate')

      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 1')
    })

    it('should stop increasing the death efficiency when the board has been cleared', () => {
      findCell(wrapper, 1, 1).simulate('click')
      clickButton(wrapper, 'iterate')
      clickButton(wrapper, 'iterate')

      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 1')
    })

    it('should handle multiple generation solutions correctly', () => {
      findCell(wrapper, 1, 1).simulate('click')
      findCell(wrapper, 1, 2).simulate('click')
      findCell(wrapper, 2, 3).simulate('click')
      clickButton(wrapper, 'iterate')
      clickButton(wrapper, 'iterate')
      clickButton(wrapper, 'iterate')

      expect(wrapper.find('.death-efficiency').text()).toBe('Death Efficiency: 6')
    })

    it('should reset death efficiency when reset', () => {
      findCell(wrapper, 1, 1).simulate('click')
      findCell(wrapper, 1, 2).simulate('click')
      findCell(wrapper, 2, 3).simulate('click')
      clickButton(wrapper, 'iterate')
      clickButton(wrapper, 'iterate')
      clickButton(wrapper, 'iterate')

      clickButton(wrapper, 'reset')

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

function clickButton (wrapper, action) {
  wrapper.find(`.${action}-button`).simulate('click')
}
