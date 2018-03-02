import CampaignDetails from '../components/CampaignDetails.js';
import { fetchCampaign, fetchCampaignSuccess, fetchCampaignFailure, resetActiveCampaign, resetDeletedCampaign } from '../actions/campaigns';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return {
    activeCampaign: globalState.campaigns.activeCampaign,
    campaignId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaign: (id) => {
      dispatch(fetchCampaign(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchCampaignFailure(result.payload.response.data));
          } else {
            dispatch(fetchCampaignSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      //clean up both activeCampaign(currrently open) and deletedCampaign(open and being deleted) states
      dispatch(resetActiveCampaign());
      dispatch(resetDeletedCampaign());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails);
