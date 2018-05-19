import React from 'react'
import Post from '@/components/Post'
import { getPostByID } from '@/api/githubAPI'

export default class PostContainer extends React.PureComponent {
  state = {
    post: {},
    loadingFlag: true
  }
  constructor(props) {
    super(props)
    getPostByID(props.id).then(data => this.setState({ post: data, loadingFlag: false }))
  }
  render() {
    const p = this.state.post
    if (!this.state.loadingFlag)
      return <Post id={p.ID} title={p.Title} tags={p.Tags} publishDate={p.PublishDate} content={p.Content} />
    return <h3>Loading...</h3>
  }
}
