import React, { Suspense, lazy } from 'react';
import './style.scss';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';

const Home = lazy(() => import(/* webpackChunkName: 'home' */ './components/Home'));
const Users = lazy(() => import(/* webpackChunkName: 'users' */ './components/Users'));

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <Suspense fallback={<span>Loading...</span>}>
                <Switch>
                    <Route path="/users" render={props => <Users {...props} />} />
                    <Route path="/" render={props => <Home {...props} />} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default App;
