import React from 'react'
import Post from '@/components/Post'
import { getPostByID } from '@/api'

export default class PostContainer extends React.PureComponent {
  state = {
    post: {},
    loading: true
  }
  constructor(props) {
    super(props)
    // getPostByID(props.id).then(data => this.setState({ post: data, loading: false }))
    // import('#/tags.json')
  }
  render() {
    const p = this.state.post
    if (!this.state.loading)
      return <Post id={p.ID} title={p.Title} tags={p.Tags} publishDate={p.PublishDate} content={p.Content} />
    return <h3>Loading...</h3>
  }
}
