import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import FIcon from '@fortawesome/react-fontawesome'
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'

import Article from '@/components/Article'

import { getPosts } from '@/api'

const pageButton = (pageNumber, dir) => {
    const number = dir ? parseInt(pageNumber, 10) - 1 : parseInt(pageNumber, 10) + 1
    return (
        <div className={dir ? 'post-left' : 'post-right'}>
            {dir && <FIcon icon={angleLeft} />}
            <Link onClick={_ => window.scrollTo(0, 0)} to={'/home/page/' + number}>
                {dir ? 'PREVIOUS' : 'NEXT'}
            </Link>
            {!dir && <FIcon icon={angleRight} />}
        </div>
    )
}
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
                            toc={null}
                            mode={false}
                        />
                    ))}
                <div className="post-nav">
                    {pageNumber > 1 && pageButton(pageNumber, true)}
                    {pageNumber < posts.length / 10 && pageButton(pageNumber, false)}
                </div>
                {!loadingFlag || <h3>Loading...</h3>}
            </div>
        )
    }
}
