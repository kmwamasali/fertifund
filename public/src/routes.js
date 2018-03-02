import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import CampaignsIndex from './pages/CampaignsIndex';
import CampaignsNew from './pages/CampaignsNew';
import CampaignsShow from './pages/CampaignsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPwd from './pages/ForgotPwd';
import ValidateEmail from './pages/ValidateEmail';
import Profile from './pages/Profile';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CampaignsIndex} />
    <Route path="campaigns/new" component={CampaignsNew} />
    <Route path="campaigns/:id" component={CampaignsShow} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgotPwd" component={ForgotPwd} />
    <Route path="/validateEmail/:token" component={ValidateEmail} />
    <Route path="/profile" component={Profile} />
  </Route>
);
