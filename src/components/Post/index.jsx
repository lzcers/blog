import React from 'react'
import { Link } from 'react-router-dom'
import FIcon from '@fortawesome/react-fontawesome'
// import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'
// import angleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'
import tagsIcon from '@fortawesome/fontawesome-free-solid/faTags'
import '@/components/Article/article.scss'
import './post.scss'
// import Toc from '@/components/Toc'
const Post = ({ title, tags, publishDate, content, toc }) => {
    const date = new Date(publishDate)
    const enMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const [month, day, year] = [enMonth[date.getMonth()], date.getDate() + 'TH', date.getFullYear()]
    return (
        <article className="post">
            {/* <Toc toc={toc} /> */}
            <h1 className="article-title">{title}</h1>
            <div className="article-date">{`${month || ''} ${day} ${year || ''}`}</div>
            <div className="article-content">
                <div className="post-body markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="article-info">
                <div className="article-tags">
                    <FIcon icon={tagsIcon} className="article-tags-pic" />
                    {tags.map(e => (
                        <Link key={e} className="article-tags-link" to={'/archive/tag/' + e}>
                            {e}
                        </Link>
                    ))}
                </div>
            </div>
            {/* <div className="post-nav">
        <div className="post-left">
          <FIcon icon={angleLeft} />
          <a href="">写作是一个学习过程</a>
        </div>
        <div className="post-right">
          <a href="">用JS 实现 Lisp 里的流</a>
          <FIcon icon={angleRight} />
        </div>
      </div> */}
        </article>
    )
}
export default Post
