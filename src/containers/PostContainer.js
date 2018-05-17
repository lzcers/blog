import React from 'react'
import Post from '@/components/Post'
import metaMarked from '@/utils/mdRender.js'

// import { getPostByID } from '@/api'

export default class PostContainer extends React.PureComponent {
  state = {
    post: {},
    loading: true
  }
  constructor(props) {
    super(props)
    // getPostByID(props.id).then(data => this.setState({ post: data, loading: false }))
    import('#/tags.json').then(data => {
      const p = data.default.filter(e => e.ID !== props.ID)[0]
      import('#/' + p.fileName).then(data => {
        const res = metaMarked(data.default)
        const post = {
          Title: res.meta.Title,
          Tags: res.meta.Tags.split('|').map(i => i.trim()),
          PublishDate: res.meta.PublishDate,
          Content: res.html
        }
        this.setState({ post, loading: false })
      })
    })
  }
  render() {
    const p = this.state.post
    if (!this.state.loading)
      return <Post id={p.ID} title={p.Title} tags={p.Tags} publishDate={p.PublishDate} content={p.Content} />
    return <h3>Loading...</h3>
  }
}
