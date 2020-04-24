import React from 'react'
import ArticlesContainer from '@/containers/ArticlesContainer'

import './home.less'

const Home = ({ match }) => {
    const pageNumber = match.params.pageNumber || 1
    return <ArticlesContainer pageNumber={pageNumber} />
}
export default Home
