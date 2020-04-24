import React from 'react'
import FIcon from '@fortawesome/react-fontawesome'
import heart from '@fortawesome/fontawesome-free-solid/faHeart'
import './footer.less'

const Footer = () => (
    <footer>
        <p>
            Copyright © KSANA 2017 - 2019
            <br />
            <FIcon icon={heart} /> Powered by React
        </p>
    </footer>
)
export default Footer
