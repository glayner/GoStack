import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SigIn from '~/pages/SignIn';
import SigUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SigIn} />
      <Route path="/register" component={SigUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
