import React from 'react'
import { Link } from 'react-router-dom'
import FIcon from '@fortawesome/react-fontawesome'
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'

import Article from '@/components/Article'

import { getPosts } from '@/api/githubAPI'
import { FaSymbol } from '@fortawesome/fontawesome'

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
    const pageNumber = this.props.pageNumber
    const offset = (pageNumber - 1) * 10
    return (
      <div className="articles">
        {this.state.posts
          .sort((a, b) => (new Date(a.PublishDate) < new Date(b.PublishDate) ? 1 : -1))
          .slice(offset, offset + 10)
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
        <div className="post-nav">
          {pageNumber > 1 ? (
            <div className="post-left">
              <FIcon icon={angleLeft} />
              <Link to={'/home/page/' + (parseInt(pageNumber, 10) - 1)}>PREVIOUS</Link>
            </div>
          ) : (
            false
          )}
          {pageNumber < this.state.posts.length / 10 ? (
            <div className="post-right">
              <Link to={'/home/page/' + (pageNumber ? parseInt(pageNumber, 10) + 1 : 2)}>NEXT</Link>
              <FIcon icon={angleRight} />
            </div>
          ) : (
            false
          )}
        </div>
        {!this.state.loadingFlag || <h3>Loading...</h3>}
      </div>
    )
  }
}
