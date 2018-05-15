import React from 'react'
import PostContainer from '@/containers/PostContainer'

const Post = ({ match }) => <PostContainer id={match.params.id} />
export default Post
