import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';

class CampaignsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="campaigns_new"/>
        <SignInFormContainer />
      </div>
    );
  }
}


export default CampaignsNew;
