import React, { Component } from 'react'
import axios from 'axios'

import ArticleItem from './ArticleItem'
import {
  SORT_TYPE,
  sortByWordCount,
  sortByWordCountRev,
  sortBySubmitted
} from '../utils/sortBy'

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
      api: ['more-articles.json'],
      soryBy: SORT_TYPE.NONE
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

  handleSortChange = sortBy => {
    console.log('sort changed to', sortBy)
    this.setState({ sortBy })
  }

  sortedArticles = () => {
    const { sortBy, articles } = this.state
    let result = [...articles]
    console.log('sortedarticles', sortBy, SORT_TYPE.WORD_COUNT)
    switch (parseInt(sortBy, 10)) {
      case SORT_TYPE.WORD_COUNT:
        return articles.sort(sortByWordCount)
      case SORT_TYPE.WORD_COUNT_REV:
        return articles.sort(sortByWordCountRev)
      case SORT_TYPE.SUBMITTED:
        return articles.sort(sortBySubmitted)
      case SORT_TYPE.NONE:
      default:
        return articles
    }
  }

  render() {
    const { articles, limit, sortBy } = this.state

    if (!articles) {
      return <div>loading</div>
    }

    console.log(this.state, 'state')

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Unpublished Articles</th>
              <th>Author</th>
              <th onClick={() => this.handleSortChange(SORT_TYPE.WORD_COUNT)}>
                Words
              </th>
              <th onClick={() => this.handleSortChange(SORT_TYPE.SUBMITTED)}>
                Submitted
              </th>
            </tr>
          </thead>
          <tbody>
            {this.sortedArticles()
              .slice(0, limit)
              .map(article => <ArticleItem key={article.id} data={article} />)}
          </tbody>
        </table>
        <button onClick={this.loadMore}>Load More</button>
      </div>
    )
  }
}

export default ArticleList
