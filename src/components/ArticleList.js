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

  async componentDidMount() {
    const articles = await axios.get('/data/articles.json')

    this.setState({
      articles: articles.data
    })
  }

  loadMore = async () => {
    if (this.state.limit < this.state.articles.length) {
      return this.setState(prevState => {
        return {
          limit: prevState.limit + 10
        }
      })
    }

    if (this.state.api.length !== 0) {
      const apiUrl = this.state.api.shift()
      const moreArticles = await axios.get(`/data/${apiUrl}`)

      return this.setState(prevState => {
        return {
          limit: prevState.limit + 10,
          articles: [...prevState.articles, ...moreArticles.data],
          api: prevState.api.slice(1)
        }
      })
    }
  }

  render() {
    if (!this.state.articles) {
      return <div>loading</div>
    }

    return (
      <div>
        <ul>
          {this.state.articles
            .slice(0, this.state.limit)
            .map(article => <ArticleItem key={article.id} data={article} />)}
        </ul>
        <button onClick={this.loadMore}>Load More</button>
      </div>
    )
  }
}

export default ArticleList
