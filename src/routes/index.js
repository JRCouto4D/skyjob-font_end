import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Main from '../pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />

        <Route path="/main" exact component={Main} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
