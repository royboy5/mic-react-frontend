export const SORT_TYPE = {
  NONE: 0,
  WORD_COUNT: 1,
  WORD_COUNT_REV: 2,
  SUBMITTED: 3,
  SUBMITTED_REV: 4
}

export const sortByWordCount = (a, b) => {
  //   console.log('sortByWordCount', a.words, b.words)
  return a.words - b.words
}

export const sortByWordCountRev = (a, b) => {
  //   console.log('sortByWordCountRev', a.words, b.words)
  return b.words - a.words
}

export const sortBySubmitted = (a, b) => {
  //   console.log('sortBySubmitted', a.publish_at, b.publish_at)
  if (a.publish_at > b.publish_at) {
    return 1
  }
  if (a.publish_at < b.publish_at) {
    return -1
  }
  return 0
}

export const sortBySubmittedRev = (a, b) => {
  //   console.log('sortBySubmittedRev', a.publish_at, b.publish_at)
  if (a.publish_at < b.publish_at) {
    return 1
  }
  if (a.publish_at > b.publish_at) {
    return -1
  }
  return 0
}
