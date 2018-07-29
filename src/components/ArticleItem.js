import React from 'react'
import PropTypes from 'prop-types'

const ArticleItem = props => {
  return (
    <tr>
      <td>{props.data.title}</td>
      <td>
        {props.data.profile.first_name} {props.data.profile.last_name}
      </td>
      <td>{props.data.words}</td>
      <td>{props.data.publish_at}</td>
    </tr>
  )
}

ArticleItem.propTypes = {
  data: PropTypes.object
}

export default ArticleItem
