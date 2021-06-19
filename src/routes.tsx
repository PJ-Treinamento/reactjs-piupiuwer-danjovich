import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/feed" component={Feed} />
        </BrowserRouter>
    )
}

export default Routes;