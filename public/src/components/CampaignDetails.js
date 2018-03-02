import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class CampaignDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchCampaign(this.props.campaignId);
  }

  render() {
    const { campaign, loading, error } = this.props.activeCampaign;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!campaign) {
      return <span />
    }

    return (
      <div className="container">
        <h3>{campaign.title}</h3>
        <h6>Categories: {campaign.categories}</h6>
        <p>{campaign.content}</p>
      </div>
    );
  }
}

export default CampaignDetails;
