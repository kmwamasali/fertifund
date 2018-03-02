import CampaignsForm from '../components/CampaignsForm.js';
import { resetNewCampaign } from '../actions/campaigns';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewCampaign());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newCampaign: state.campaigns.newCampaign
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsForm);

