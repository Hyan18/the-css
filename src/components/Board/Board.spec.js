import React from 'react'
import { shallow } from 'enzyme'
import Board from './Board'

describe('Board', () => {
  const wrapper = shallow(<Board />)

  it('should render a <div />', () => {
    expect(wrapper.find('.board-div')).toBeDefined()
    expect(wrapper.find('.board-div').length).toEqual(1)
  })

  it('should render a 10x10 grid', () => {
    const wrapper = shallow(<Board />)
    const total = 10 * 10

    expect(wrapper.find('.board-div').children('Cell').length).toEqual(total)
  })

  it('should turn a cell to alive', () => {
    const wrapper = shallow(<Board />)

    let cell = wrapper.children().find('Cell').findWhere(n => n.prop('x') === 0 && n.prop('y') === 0)

    cell.simulate('click')
    cell = wrapper.children().find('Cell').findWhere(n => n.prop('x') === 0 && n.prop('y') === 0)
    expect(cell.prop('state')).toBe(1)
  })

  it('should iterate', () => {
    const wrapper = shallow(<Board />)

    setCell(wrapper, 0, 0)
    setCell(wrapper, 1, 0)
    setCell(wrapper, 0, 1)

    expect(wrapper
      .children()
      .find('Cell')
      .findWhere(n => n.prop('x') === 1 && n.prop('y') === 1)
      .prop('state')
    ).toBe(0)
    wrapper.find('.iterate-button').simulate('click')
    expect(wrapper
      .children()
      .find('Cell')
      .findWhere(n => n.prop('x') === 1 && n.prop('y') === 1)
      .prop('state')
    ).toBe(1)
  })
})

it('should update the generation counter to ~20', (done) => {
  const wrapper = shallow(<Board />)
  wrapper.find('.play-button').simulate('click')
  setTimeout(() => {
    wrapper.find('.pause-button').simulate('click')
    const generationCount1 = parseInt(
      wrapper
        .children()
        .find('.generationCounter')
        .text())
    expect(generationCount1).toBeGreaterThanOrEqual(19)
    expect(generationCount1).toBeLessThan(21)
    setTimeout(() => {
      const generationCount2 = parseInt(
        wrapper
          .children()
          .find('.generationCounter')
          .text())
      expect(generationCount2).toEqual(generationCount1)
      done()
    }, 300)
  }, 2000)
})

it('should update the generation counter to ~12', (done) => {
  const wrapper = shallow(<Board />)
  wrapper.find('.play-button').simulate('click')
  setTimeout(() => {
    wrapper.find('.pause-button').simulate('click')
    const generationCount1 = parseInt(
      wrapper
        .children()
        .find('.generationCounter')
        .text())
    expect(generationCount1).toBeGreaterThanOrEqual(11)
    expect(generationCount1).toBeLessThan(13)
    setTimeout(() => {
      const generationCount2 = parseInt(
        wrapper
          .children()
          .find('.generationCounter')
          .text())
      expect(generationCount2).toEqual(generationCount1)
      done()
    }, 500)
  }, 1200)
})

it('should allow to play after pausing', () => {
  const wrapper = shallow(<Board />)
  wrapper.find('.play-button').simulate('click')
  wrapper.find('.pause-button').simulate('click')
  const generationCount1 = parseInt(
    wrapper
      .children()
      .find('.generationCounter')
      .text())
  wrapper.find('.play-button').simulate('click')
  wrapper.find('.pause-button').simulate('click')
  expect(parseInt(
    wrapper
      .children()
      .find('.generationCounter')
      .text())).toBeGreaterThan(generationCount1)
})

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

function setCell(wrapper, x, y) {
  wrapper.children().find('Cell').findWhere(n => n.prop('x') === x && n.prop('y') === y).simulate('click')
}
