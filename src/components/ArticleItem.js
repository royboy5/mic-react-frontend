import React from 'react'
import PropTypes from 'prop-types'

const ArticleItem = props => {
  return <div>{props.data.title}</div>
}

ArticleItem.propTypes = {
  data: PropTypes.object
}

export default ArticleItem
