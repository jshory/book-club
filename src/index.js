import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Books from './Books';
import Members from './Members';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';


const routing = (
    <Router>
        <div className="menu-outer">
            <ul className="horizontal-list">
                <li className="menu-option">
                    <NavLink exact activeClassName="active" className="menu-left" to="/">Book Club</NavLink>
                </li>
                <li className="menu-option">
                    <NavLink activeClassName="active" className="menu-right" to="/members">Members</NavLink>
                </li>
                <li className="menu-option">
                    <NavLink activeClassName="active" className="menu-right" to="/books">Books</NavLink>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/books" component={Books} />
                <Route path="/members" component={Members} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
