import React from 'react'
import '@/styles/footer.scss'
import FIcon from '@fortawesome/react-fontawesome'
import heart from '@fortawesome/fontawesome-free-solid/faHeart'
export default class Footer extends React.PureComponent {
    render() {
        return (
            <footer>
                <p>Copyright © KSANA 2017 - 2018 <FIcon icon={heart} /> Powered by React</p>
            </footer>            
        )
    }
}