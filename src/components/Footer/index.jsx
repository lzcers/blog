import React from 'react'
import FIcon from '@fortawesome/react-fontawesome'
import heart from '@fortawesome/fontawesome-free-solid/faHeart'
import './footer.scss'

const Footer = _ => (
    <footer>
        <p>
            Copyright © KSANA 2017 - 2018 <FIcon icon={heart} /> Powered by React
        </p>
    </footer>
)
export default Footer
