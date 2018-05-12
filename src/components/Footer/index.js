import React from 'react'

import './footer.scss'
import FIcon from '@fortawesome/react-fontawesome'
import heart from '@fortawesome/fontawesome-free-solid/faHeart'

const Footer = props => (
    <footer>
        <p>Copyright © KSANA 2017 - 2018 <FIcon icon={ heart } /> Powered by React</p>
    </footer>            
)
export default Footer