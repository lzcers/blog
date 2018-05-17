import React from 'react'
// import { getPosts } from '@/api'
import metaMarked from '@/utils/mdRender.js'

import Article from '@/components/Article'

export default class ArticlesContainer extends React.PureComponent {
  state = {
    loadingFlag: true,
    posts: []
  }
  constructor(props) {
    super(props)
    import('#/tags.json').then(postList => {
      const articles = postList.default
      Promise.all(
        articles.map((e, index) =>
          import('#/' + e.fileName).then(data => {
            const res = metaMarked(data.default)
            const post = {
              ID: index,
              Title: res.meta.Title,
              Tags: res.meta.Tags.split('|').map(i => i.trim()),
              PublishDate: res.meta.PublishDate,
              Content: res.html
            }
            this.state.posts.push(post)
            this.setState({ posts: [...this.state.posts] })
            return Promise.resolve()
          })
        )
      ).then(_ => this.setState({ loadingFlag: false }))
    })
    // getPosts().then(data => this.setState({ posts: data }))
  }

  sliceContent(content) {
    // 把内容按句号分段，取前10段
    return content.split(/(。)/g, 10).join('') + '<strong>……</strong>'
    // return marked(content).html.replace(/(<[^>]+>)|(\n)/g,"").slice(0, 250).trim()
  }

  render() {
    return (
      <div className="articles">
        {this.state.posts
          .sort((a, b) => (new Date(a.PublishDate) < new Date(b.PublishDate) ? 1 : -1))
          .map(p => (
            <Article
              key={p.ID}
              id={p.ID}
              title={p.Title}
              tags={p.Tags}
              publishDate={p.PublishDate}
              content={this.sliceContent(p.Content)}
            />
          ))}
        {!this.state.loadingFlag || <h3>Loading...</h3>}
      </div>
    )
  }
}
