import React, { useState } from 'react'
import Article from '@/components/Article'
import { getPostByID } from '@/api'

export default props => {
    const [post, setPosts] = useState([])
    const [loadingFlag, setLoadingFlag] = useState(true)

    getPostByID(props.id).then(data => {
        setPosts(data)
        setLoadingFlag(false)
    })

    if (!loadingFlag)
        return (
            <Article
                id={post.ID}
                title={post.Title}
                tags={post.Tags}
                publishDate={post.PublishDate}
                content={post.Content}
                toc={post.TOC}
                mode={true}
            />
        )

    return <h3>Loading...</h3>
}
