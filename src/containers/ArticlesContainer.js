import React from 'react'
import { getPosts } from '@/api'

import Article from '@/components/Article'

export default class ArticlesContainer extends React.PureComponent {
  state = {
    posts: []
  }
  constructor(props) {
    super(props)
    getPosts().then(data => this.setState({ posts: data }))
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
      </div>
    )
  }
}
