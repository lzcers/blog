import React from 'react'
import Article from '@/components/Article'
import { getPosts } from '@/api/githubAPI'

export default class ArticlesContainer extends React.PureComponent {
  state = {
    loadingFlag: true,
    posts: []
  }
  constructor(props) {
    super(props)
    getPosts().then(data => this.setState({ loadingFlag: false, posts: data }))
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
              content={p.Content}
            />
          ))}
        {!this.state.loadingFlag || <h3>Loading...</h3>}
      </div>
    )
  }
}
