import React, { Component } from 'react'
import axios from 'axios'
import { Button } from '@blueprintjs/core'

import ArticleItem from './ArticleItem'
import SortGroup from './SortGroup'
import {
  SORT_TYPE,
  sortByWordCount,
  sortByWordCountRev,
  sortBySubmitted,
  sortBySubmittedRev
} from '../utils/sortBy'

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
      api: ['more-articles.json'],
      sortBy: SORT_TYPE.NONE
    }
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    const sortType = localStorage.getItem('sortType')
    sortType && this.setState({ sortBy: sortType })
    
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
    // console.log('sort changed to', sortBy)
    this.setState(prevState => {
      localStorage.setItem('sortType', sortBy)
      return { sortBy }
    })
  }

  sortedArticles = () => {
    const { sortBy, articles } = this.state
    let result = [...articles]

    // console.log('sortedarticles', sortBy, SORT_TYPE.WORD_COUNT)

    switch (parseInt(sortBy, 10)) {
      case SORT_TYPE.WORD_COUNT:
        return result.sort(sortByWordCount)
      case SORT_TYPE.WORD_COUNT_REV:
        return result.sort(sortByWordCountRev)
      case SORT_TYPE.SUBMITTED:
        return result.sort(sortBySubmitted)
      case SORT_TYPE.SUBMITTED_REV:
        return result.sort(sortBySubmittedRev)
      case SORT_TYPE.NONE:
      default:
        return result
    }
  }

  render() {
    const { articles, limit } = this.state

    // console.log(this.state, 'state')

    if (!articles) {
      return <div>loading</div>
    }

    return (
      <div className="articles">
        <SortGroup handleSortChange={this.handleSortChange} />
        <div className="cards">
          {this.sortedArticles()
            .slice(0, limit)
            .map(article => <ArticleItem key={article.id} data={article} />)}
        </div>
        <Button
          className="articles__load"
          minimal
          large
          onClick={this.loadMore}
        >
          Load More
        </Button>
      </div>
    )
  }
}

export default ArticleList
