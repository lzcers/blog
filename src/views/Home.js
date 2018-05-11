import React from 'react'
import Article from '@/components/Article.js'

export default class Home extends React.PureComponent {
    render() {
        return (
            <div className="articles">
                <Article />
                <Article />
                <Article />
                <Article />
                <Article />
                <Article />
                <Article />
            </div>
        )
    }
}
