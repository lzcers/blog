import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Routes from '@/routes';
import 'normalize.css';
import './base.less';

ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById('app')
);
