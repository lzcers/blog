import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import Routes from '@/routes';
import 'normalize.css';
import './base.less';

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<Router><Routes /></Router>);