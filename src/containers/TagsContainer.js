import React from 'react'
import { Link } from 'react-router-dom'
import { getTags } from '@/api/githubAPI'

export default class TagsContainer extends React.PureComponent {
  state = {
    tags: [],
    selected: ''
  }
  constructor(props) {
    super(props)
    getTags().then(data => this.setState({ tags: data }))
  }
  render() {
    return [
      <li
        key="ALL"
        style={{
          color: this.state.selected === 'ALL' ? '#fff' : '',
          background: this.state.selected === 'ALL' ? '#333' : ''
        }}
      >
        <Link to="/archive" onClick={_ => this.setState({ selected: 'ALL' })}>
          ALL
        </Link>
      </li>
    ].concat(
      this.state.tags.map(i => (
        <li
          key={i}
          style={{
            color: this.state.selected === i ? '#fff' : '',
            background: this.state.selected === i ? '#333' : ''
          }}
        >
          <Link to={'/archive/tag/' + i} onClick={_ => this.setState({ selected: i })}>
            {i}
          </Link>
        </li>
      ))
    )
  }
}
