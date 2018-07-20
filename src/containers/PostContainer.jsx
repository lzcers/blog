import React, { PureComponent } from 'react'
import Post from '@/components/Post'
import { getPostByID } from '@/api/githubAPI'

export default class PostContainer extends PureComponent {
    state = {
        post: {},
        loadingFlag: true
    }

    constructor(props) {
        super(props)
        getPostByID(props.id).then(data => this.setState({ post: data, loadingFlag: false }))
    }

    render() {
        const { post, loadingFlag } = this.state
        if (!loadingFlag)
            return (
                <Post
                    id={post.ID}
                    title={post.Title}
                    tags={post.Tags}
                    publishDate={post.PublishDate}
                    content={post.Content}
                    toc={post.TOC}
                />
            )
        return <h3>Loading...</h3>
    }
}
