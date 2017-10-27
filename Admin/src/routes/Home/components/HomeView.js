import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export class HomeView extends React.Component {
  render () {
    return (
      <div>
        <h4>Welcome!</h4>
        <h5>How are you :D</h5>
        <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
      </div>
    )
  }
}

export default HomeView
