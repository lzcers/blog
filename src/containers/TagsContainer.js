import React from 'react'
import { getTags } from '@/api'

export default class TagsContainer extends React.PureComponent {
  state = {
    tags: []
  }
  constructor(props) {
    super(props)
    getTags().then(data => this.setState({ tags: data }))
  }
  render() {
    return this.state.tags.map(i => (
      <li key={i}>
        <a href="#">{i}</a>
      </li>
    ))
  }
}
