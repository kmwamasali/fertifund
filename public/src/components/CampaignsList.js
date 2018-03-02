import React, { Component } from 'react';
import { Link } from 'react-router';

class CampaignList extends Component {
  componentWillMount() {
    this.props.fetchCampaign();
  }

  renderCategories(categories) {
     return categories.map((c) => {
        c = c.trim();
        return (
          <Link to={"filter/" + c} key={c} className="list-group-item-text">{" " + c + " "}</Link>
        );
     });
  }

  renderCampaign(campaigns) {
    return campaigns.map((campaign) => {
      return (
        <li className="list-group-item" key={campaign._id}>
          <Link style={{color:'black'}} to={"campaigns/" + campaign._id}>
            <h3 className="list-group-item-heading">{campaign.title}</h3>
          </Link>
            {this.renderCategories(campaign.categories)}
        </li>
      );
    });
  }

  render() {
    const { campaigns, loading, error } = this.props.campaignsList;

    if(loading) {
      return <div className="container"><h1>Campaign</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Campaign</h1>
        <ul className="list-group">
          {this.renderCampaign(campaigns)}
        </ul>
      </div>
    );
  }
}


export default CampaignList;
