import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const ArticleItem = props => {
  return (
    <tr>
      <td>{props.data.title}</td>
      <td>
        {props.data.profile.first_name} {props.data.profile.last_name}
      </td>
      <td>{props.data.words}</td>
      <td>{moment(props.data.publish_at).fromNow()}</td>
    </tr>
  )
}

ArticleItem.propTypes = {
  data: PropTypes.object
}

export default ArticleItem
