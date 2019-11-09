import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SigIn from '../pages/SigIn';
import SigUp from '../pages/SigUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route patch="/" exact component={SigIn} />
      <Route patch="/register" component={SigUp} />

      <Route patch="/dashboard" component={Dashboard} />
      <Route patch="/profile" component={Profile} />
    </Switch>
  );
}
