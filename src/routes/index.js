import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import Categories from '../pages/Catalog/Categories';
import Customers from '../pages/Catalog/Customers';
import Products from '../pages/Catalog/Products';
import Providers from '../pages/Catalog/Providers';
import NewItem from '../pages/Catalog/Products/NewItem';

import Budgets from '../pages/Sales/Budgets';
import PDV from '../pages/Sales/PDV';
import Returns from '../pages/Sales/Returns';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/main" exact component={Main} isPrivate />
      <Route path="/categories" exact component={Categories} isPrivate />
      <Route path="/customers" exact component={Customers} isPrivate />
      <Route path="/products" exact component={Products} isPrivate />
      <Route path="/products/newItem" exact component={NewItem} isPrivate />
      <Route path="/providers" exact component={Providers} isPrivate />

      <Route path="/budgets" exact component={Budgets} isPrivate />
      <Route path="/pdv" exact component={PDV} isPrivate />
      <Route path="/returns" exact component={Returns} isPrivate />
    </Switch>
  );
}
