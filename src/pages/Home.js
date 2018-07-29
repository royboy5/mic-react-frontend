import React, { Component } from 'react'

import ArticleList from '../components/ArticleList'

class Home extends Component {
  render () {
    return (
      <div className='home'>
        <ArticleList />
      </div>
    )
  }
}

export default Home
