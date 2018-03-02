import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import CampaignFormContainer from '../containers/CampaignFormContainer.js';

class CampaignsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="campaigns_new"/>
        <CampaignFormContainer />
      </div>
    );
  }
}


export default CampaignsNew;
