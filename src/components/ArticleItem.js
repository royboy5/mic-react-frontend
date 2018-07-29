import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Elevation } from '@blueprintjs/core'

const ArticleItem = props => {
  return (
    <Card elevation={Elevation.FOUR}>
      <figure>
        <img src={props.data.image} />
        <figcaption>
          <a href={props.data.url}>{props.data.title}</a>
        </figcaption>
      </figure>
      <h5>
        {props.data.profile.first_name} {props.data.profile.last_name}
      </h5>
      <p>Words: {props.data.words}</p>
      <p>Submitted: {moment(props.data.publish_at).fromNow()}</p>
    </Card>
  )
}

ArticleItem.propTypes = {
  data: PropTypes.object
}

export default ArticleItem
