import React, { Component } from 'react'
import axios from 'axios'

import ArticleItem from './ArticleItem'

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
      api: ['more-articles.json']
    }
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    try {
      const res = await axios.get('/data/articles.json')
      this.setState({
        articles: res.data
      })
    } catch (error) {
      console.error(error)
    }
  }

  loadMore = async () => {
    if (this.state.limit < this.state.articles.length) {
      this.setState(prevState => {
        return {
          limit: prevState.limit + 10
        }
      })
    }

    if (this.state.api.length) {
      const apiArr = [...this.state.api]
      const apiUrl = apiArr.shift()
      const res = await axios.get(`/data/${apiUrl}`)

      this.setState(prevState => {
        return {
          limit: prevState.limit + 10,
          articles: [...this.state.articles, ...res.data],
          api: apiArr
        }
      })
    }
  }

  render() {
    const { articles, limit } = this.state

    if (!articles) {
      return <div>loading</div>
    }

    return (
      <div>
        <ul>
          {articles
            .slice(0, limit)
            .map(article => <ArticleItem key={article.id} data={article} />)}
        </ul>
        <button onClick={this.loadMore}>Load More</button>
      </div>
    )
  }
}

export default ArticleList
