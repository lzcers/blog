import React from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '@/api'

export default class ArchiveContainer extends React.PureComponent {
  state = {
    posts: []
  }
  constructor(props) {
    super(props)
    // getPosts().then(data => this.setState({ posts: data }))
    import('#/tags.json').then(postList => {
      this.setState({ posts: postList.default })
    })
  }
  dateTransform(publishDate) {
    const date = new Date(publishDate)
    const enMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const [month, day, year] = [enMonth[date.getMonth()], date.getDate() + 'TH', date.getFullYear()]
    return `${month} ${day} ${year}`
  }
  render() {
    return this.state.posts.sort((a, b) => (new Date(a.PublishDate) < new Date(b.PublishDate) ? 1 : -1)).map(i => (
      <li key={i.ID}>
        <Link to={'/post/' + i.ID}>
          <span className="item-name">{i.Title}</span>
          <span className="item-date">{this.dateTransform(i.PublishDate)}</span>
        </Link>
      </li>
    ))
  }
}
