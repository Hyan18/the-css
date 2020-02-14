import React from 'react'
import { shallow } from 'enzyme'
import MapList from './MapList'

describe('MapList', () => {
  const presets = [{ name: 'testMap1', cells: [[1, 0], [0, 1]] }, { name: 'testMap2', cells: [[0, 0], [0, 1]] }]
  const loadMapMock = jest.fn()
  const wrapper = shallow(<MapList presets={presets} onClick={loadMapMock}/>)

  it('should list all the maps', () => {
    expect(wrapper.text().includes('testMap1')).toBeTruthy()
    expect(wrapper.text().includes('testMap2')).toBeTruthy()
  })

  it('should call the loadMap function with the appropriate argument when a button clicked', () => {
    const button = wrapper.find('li').findWhere(n => n.prop('value') === 'testMap2').find('button')

    button.simulate('click')
    expect(loadMapMock.mock.calls.length).toBe(1)
    expect(loadMapMock.mock.calls[0][0]).toEqual('testMap2')
  })
})
