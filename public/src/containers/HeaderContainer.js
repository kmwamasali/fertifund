import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaigns, resetDeletedCampaign, deleteCampaign, deleteCampaignSuccess, deleteCampaignFailure } from '../actions/campaigns';
import { logoutUser } from '../actions/users';
import Header from '../components/header.js';



function mapStateToProps(state) {
  return { 
    deletedCampaign: state.campaigns.deletedCampaign,
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeleteClick: () => {
      let token = sessionStorage.getItem('jwtToken');
      if (!token || token === '') { //if there is no token, dont bother,
          let data = {data: {message: 'Please Sign In'}};//axios like error
          dispatch(deleteCampaignFailure(data)); // but let other comps know
          return;
      }

    	dispatch(deleteCampaign(ownProps.campaignId, token))
      	.then((response) => {
            !response.error ? dispatch(deleteCampaignSuccess(response.payload)) : dispatch(deleteCampaignFailure(response.payload));
          });
  	 },
     resetMe: () =>{
        dispatch(resetDeletedCampaign());
     },

     logout: () => {
         sessionStorage.removeItem('jwtToken');
         dispatch(logoutUser());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
