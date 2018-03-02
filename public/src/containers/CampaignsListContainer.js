import { connect } from 'react-redux'
import { fetchCampaigns, fetchCampaignsSuccess, fetchCampaignsFailure } from '../actions/campaigns';
import CampaignsList from '../components/CampaignsList';


const mapStateToProps = (state) => {
  return { 
    campaignsList: state.campaigns.campaignsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaigns: () => {
      dispatch(fetchCampaigns()).then((response) => {
            !response.error ? dispatch(fetchCampaignsSuccess(response.payload.data)) : dispatch(fetchCampaignsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsList);