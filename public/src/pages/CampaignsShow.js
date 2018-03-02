import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteCampaign } from '../actions/campaigns';
import Header from '../containers/HeaderContainer.js';
import CampaignDetailsContainer from '../containers/CampaignDetailsContainer.js';

class CampaignsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.deleteCampaign(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div className='container'>
        <Header type="campaigns_show" campaignId={this.props.params.id}/>
        <CampaignDetailsContainer id={this.props.params.id}/>
      </div>
    );
  }
}

export default CampaignsShow;
