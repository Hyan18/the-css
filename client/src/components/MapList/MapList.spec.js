import React from 'react'
import { shallow } from 'enzyme'

import MapList from './MapList'
import ParameterInput from '../ParameterInput/ParameterInput'

import axios from 'axios'

jest.mock('axios')
axios.get.mockReturnValue({
  data: [
    { name: 'testMap1', cells: [[1, 0], [0, 1]] },
    { name: 'testMap2', cells: [[0, 0], [0, 1]] }
  ]
})

describe('MapList', () => {
  const loadMapMock = jest.fn()
  const saveBoardFuncMock = jest.fn().mockReturnValue({
    name: 'Saved Test Map',
    cells: [[1, 1, 1], [0, 0, 0], [1, 1, 1]]
  })
  const wrapper = shallow(
    <MapList
      saveBoardFunc={saveBoardFuncMock}
      loadMapFunc={loadMapMock}
    />
  )

  beforeEach(() => {
    loadMapMock.mockClear()
    saveBoardFuncMock.mockClear()
  })

  it('should render a containing div', () => {
    expect(wrapper.find('div.map-list').length).toBe(1)
  })

  it('should have a map name parameter input', () => {
    const input = wrapper.find(ParameterInput)
      .findWhere(n => n.props().parameter === 'map-name')
    expect(input.length).toBe(1)
    expect(input.props().prompt).toBe('Name:')
    expect(input.props().buttonText).toBe('Save')
    expect(input.props().func).toBe(wrapper.instance().saveBoard)
  })

  it('should list all the maps', () => {
    expect(wrapper.text().includes('testMap1')).toBeTruthy()
    expect(wrapper.text().includes('testMap2')).toBeTruthy()
  })

  describe('.saveBoard', () => {
    it('should call saveBoardFunc with the name parameter', () => {
      wrapper.instance().saveBoard('Test Name')
      expect(saveBoardFuncMock.mock.calls.length).toBe(1)
      expect(saveBoardFuncMock.mock.calls[0][0]).toBe('Test Name')
    })

    it('should add the board to the list', () => {
      const map = {
        name: 'Saved Test Map',
        cells: [[1, 1, 1], [0, 0, 0], [1, 1, 1]]
      }
      wrapper.instance().saveBoard(map.name)

      expect(wrapper.text().includes(map.name)).toBeTruthy()
    })
  })

  it('should call the loadMap function with the appropriate argument when a button clicked', () => {
    const button = wrapper.find('li').findWhere(n => n.prop('value') === 'testMap2').find('button')
    const map = { name: 'testMap2', cells: [[0, 0], [0, 1]] }

    button.simulate('click')
    expect(loadMapMock.mock.calls.length).toBe(1)
    expect(loadMapMock.mock.calls[0][0]).toEqual(map)
  })
})
