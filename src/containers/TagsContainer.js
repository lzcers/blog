import React from 'react'
import { Link } from 'react-router-dom'
// import { getTags } from '@/api'

export default class TagsContainer extends React.PureComponent {
  state = {
    tags: [],
    selected: ''
  }
  constructor(props) {
    super(props)
    // getTags().then(data => this.setState({ tags: data }))
    import('#/tags.json').then(res => {
      const data = res.default
      this.setState({
        selected: this.props.tag || 'ALL',
        tags: [...new Set(data.map(i => i.Tags.split('|').map(e => e.trim())).reduce((pre, cur) => pre.concat(cur)))]
      })
    })
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
