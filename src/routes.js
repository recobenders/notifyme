import React from 'react';
import { Switch, Route } from 'react-router';
import Landing from './components/views/Landing';
import HowTo from './components/views/HowTo';
import ItemList from './components/views/ItemList';
import Item from './components/views/Item';

const routes = (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/how-to" component={HowTo} />
        <Route path="/item-list" component={ItemList} />
        <Route path="/item" component={Item} />
    </Switch>
);
export default routes;