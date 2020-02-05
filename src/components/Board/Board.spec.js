import React from 'react'
import { shallow } from 'enzyme'
import Board from './Board'

describe('Board', () => {

  const wrapper = shallow(<Board />)

  it('should render a <div />', () => {
    console.log(wrapper.find('.board-div'))
    expect(wrapper.find('.board-div')).toBeDefined()
    expect(wrapper.find('.board-div').length).toEqual(1)
  });

  // it('should render a 10x10 empty grid', () => {
  //   const wrapper = shallow((
  //     <Board>
  //       <div className="board-div">
  //         <div className='Cell0'></div>
  //       </div>
  //     </Board>))
  //   expect(wrapper.contains(<div className='Cell0'></div>)).toBeTruthy()
  // })
})
