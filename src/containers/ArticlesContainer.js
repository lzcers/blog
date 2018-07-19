import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import FIcon from '@fortawesome/react-fontawesome'
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'

import Article from '@/components/Article'

import { getPosts } from '@/api/githubAPI'

export default class ArticlesContainer extends PureComponent {
    state = {
        loadingFlag: true,
        posts: []
    }

    constructor(props) {
        super(props)
        getPosts().then(data => this.setState({ loadingFlag: false, posts: data }))
    }

    render() {
        const { pageNumber } = this.props
        const { posts, loadingFlag } = this.state
        const offset = (pageNumber - 1) * 10
        return (
            <div className="articles">
                {posts
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
                            <Link
                                onClick={_ => window.scrollTo(0, 0)}
                                to={'/home/page/' + (parseInt(pageNumber, 10) - 1)}
                            >
                                PREVIOUS
                            </Link>
                        </div>
                    ) : (
                        false
                    )}
                    {pageNumber < posts.length / 10 ? (
                        <div className="post-right">
                            <Link
                                onClick={_ => window.scrollTo(0, 0)}
                                to={'/home/page/' + (pageNumber ? parseInt(pageNumber, 10) + 1 : 2)}
                            >
                                NEXT
                            </Link>
                            <FIcon icon={angleRight} />
                        </div>
                    ) : (
                        false
                    )}
                </div>
                {!loadingFlag || <h3>Loading...</h3>}
            </div>
        )
    }
}
