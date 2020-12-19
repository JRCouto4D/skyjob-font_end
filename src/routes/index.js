import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import Categories from '../pages/Catalog/Categories';
import Customers from '../pages/Catalog/Customers';
import Products from '../pages/Catalog/Products';
import Providers from '../pages/Catalog/Providers';
import NewProduct from '../pages/Catalog/Products/NewProduct';
import NewCategory from '../pages/Catalog/Categories/NewCategory';
import NewProviders from '../pages/Catalog/Providers/NewProviders';
import NewCustomer from '../pages/Catalog/Customers/NewCustomer';

import Budgets from '../pages/Sales/Budgets';
import PDV from '../pages/Sales/PDV';
import Selling from '../pages/Sales/PDV/Selling';

import Returns from '../pages/Sales/Returns';
import SetSale from '../pages/Sales/Returns/SetSale';
import ListReturns from '../pages/Sales/Returns/ListReturns';

import Payment from '../pages/Sales/PDV/Payment';

import Operations from '../pages/Operations';

export default function Routes() {
  const { dataSale } = useSelector((state) => state.saleData);

  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/main" exact component={Main} isPrivate />
      <Route path="/categories" exact component={Categories} isPrivate />
      <Route
        path="/categories/newCategory"
        exact
        component={NewCategory}
        isPrivate
      />
      <Route path="/customers" exact component={Customers} isPrivate />
      <Route
        path="/customers/newCustomer"
        exact
        component={NewCustomer}
        isPrivate
      />
      <Route path="/products" exact component={Products} isPrivate />
      <Route path="/products/newItem" exact component={NewProduct} isPrivate />
      <Route path="/providers" exact component={Providers} isPrivate />
      <Route
        path="/providers/newProvider"
        exact
        component={NewProviders}
        isPrivate
      />

      <Route path="/budgets" exact component={Budgets} isPrivate />
      <Route
        path="/pdv"
        exact
        component={dataSale === null ? PDV : Selling}
        isPrivate
      />
      <Route path="/pdv/payment" exact component={Payment} isPrivate />
      <Route path="/returns" exact component={Returns} isPrivate />
      <Route path="/returns/setsale" exact component={SetSale} isPrivate />
      <Route path="/returns/list" exact component={ListReturns} isPrivate />

      <Route path="/operations" exact component={Operations} isPrivate />
    </Switch>
  );
}
