import React from 'react';
import { Switch, Route } from 'react-router';
import Landing from './components/views/Landing';
import HowItWorks from './components/views/HowItWorks';
import ItemList from './components/views/ItemList';
import Item from './components/views/Item';

const routes = (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/item-list" component={ItemList} />
        <Route path="/item" component={Item} />
    </Switch>
);
export default routes;