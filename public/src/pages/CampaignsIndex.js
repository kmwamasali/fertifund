import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ValidateEmailAlertContainer from '../containers/ValidateEmailAlertContainer.js';
import CampaignsList from '../containers/CampaignsListContainer.js';

class CampaignsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="campaigns_index"/>
        <ValidateEmailAlertContainer/>
        <CampaignsList />
      </div>
    );
  }
}


export default CampaignsIndex;
