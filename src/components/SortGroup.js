import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Button, ButtonGroup } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { SORT_TYPE } from '../utils/sortBy'

const SortGroup = props => {
  return (
    <ButtonGroup minimal className='sort-group'>
      <Button
        minimal
        text='Words'
        icon={<Icon icon={IconNames.ARROW_UP} iconSize={20} title={false} />}
        onClick={() => props.handleSortChange(SORT_TYPE.WORD_COUNT)}
      />
      <Button
        minimal
        text='Words'
        icon={<Icon icon={IconNames.ARROW_DOWN} iconSize={20} title={false} />}
        onClick={() => props.handleSortChange(SORT_TYPE.WORD_COUNT_REV)}
      />
      <Button
        minimal
        text='Submitted'
        icon={<Icon icon={IconNames.TIME} iconSize={20} title={false} />}
        rightIcon={
          <Icon icon={IconNames.ARROW_UP} iconSize={20} title={false} />
        }
        onClick={() => props.handleSortChange(SORT_TYPE.SUBMITTED)}
      />
      <Button
        minimal
        text='Submitted'
        icon={<Icon icon={IconNames.TIME} iconSize={20} title={false} />}
        rightIcon={
          <Icon icon={IconNames.ARROW_DOWN} iconSize={20} title={false} />
        }
        onClick={() => props.handleSortChange(SORT_TYPE.SUBMITTED_REV)}
      />
    </ButtonGroup>
  )
}

SortGroup.propTypes = {
  handleSortChange: PropTypes.func
}

export default SortGroup
