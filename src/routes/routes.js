import { Switch, Route } from 'react-router-dom';
import React from 'react';
import GlobalFeed from '../pages/globalFeed/GlobalFeed';
import Article from '../pages/article/Article';
import Authentication from '../pages/authentication/Authentication';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={GlobalFeed} exact />
            <Route path="/login/" component={Authentication} />
            <Route path="/register/" component={Authentication} />
            <Route path="/articles/" component={Article} />
        </Switch>
    );
};
export default Routes;
