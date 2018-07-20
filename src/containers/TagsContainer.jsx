import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { getTags } from '@/api/githubAPI'

export default class TagsContainer extends PureComponent {
    state = {
        tags: [],
        selected: ''
    }

    constructor(props) {
        super(props)
        const { tag } = this.props
        getTags().then(data => this.setState({ tags: data, selected: tag }))
    }

    render() {
        const { selected, tags } = this.state
        return [
            <li
                key="ALL"
                style={{
                    color: selected === 'ALL' ? '#fff' : '',
                    background: selected === 'ALL' ? '#333' : ''
                }}
            >
                <Link to="/archive" onClick={_ => this.setState({ selected: 'ALL' })}>
                    ALL
                </Link>
            </li>
        ].concat(
            tags.map(i => (
                <li
                    key={i}
                    style={{
                        color: selected === i ? '#fff' : '',
                        background: selected === i ? '#333' : ''
                    }}
                >
                    <Link to={'/archive/tag/' + i} onClick={_ => this.setState({ selected: i })}>
                        {i}
                    </Link>
                </li>
            ))
        )
    }
}
