import axios from 'axios';

//Campaign list
export const FETCH_CAMPAIGNS = 'FETCH_CAMPAIGNS';
export const FETCH_CAMPAIGNS_SUCCESS = 'FETCH_CAMPAIGNS_SUCCESS';
export const FETCH_CAMPAIGNS_FAILURE = 'FETCH_CAMPAIGNS_FAILURE';
export const RESET_CAMPAIGNS = 'RESET_CAMPAIGNS';

//Create new campaign
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';
export const CREATE_CAMPAIGN_SUCCESS = 'CREATE_CAMPAIGN_SUCCESS';
export const CREATE_CAMPAIGN_FAILURE = 'CREATE_CAMPAIGN_FAILURE';
export const RESET_NEW_CAMPAIGN = 'RESET_NEW_CAMPAIGN';

//Validate campaign fields like Title, Categries on the server
export const VALIDATE_CAMPAIGN_FIELDS = 'VALIDATE_CAMPAIGN_FIELDS';
export const VALIDATE_CAMPAIGN_FIELDS_SUCCESS = 'VALIDATE_CAMPAIGN_FIELDS_SUCCESS';
export const VALIDATE_CAMPAIGN_FIELDS_FAILURE = 'VALIDATE_CAMPAIGN_FIELDS_FAILURE';
export const RESET_CAMPAIGN_FIELDS = 'RESET_CAMPAIGN_FIELDS';

//Fetch campaign
export const FETCH_CAMPAIGN = 'FETCH_CAMPAIGN';
export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
export const FETCH_CAMPAIGN_FAILURE = 'FETCH_CAMPAIGN_FAILURE';
export const RESET_ACTIVE_CAMPAIGN = 'RESET_ACTIVE_CAMPAIGN';

//Delete campaign
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN';
export const DELETE_CAMPAIGN_SUCCESS = 'DELETE_CAMPAIGN_SUCCESS';
export const DELETE_CAMPAIGN_FAILURE = 'DELETE_CAMPAIGN_FAILURE';
export const RESET_DELETED_CAMPAIGN = 'RESET_DELETED_CAMPAIGN';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchCampaigns() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/campaigns`,
    headers: []
  });

  return {
    type: FETCH_CAMPAIGNS,
    payload: request
  };
}

export function fetchCampaignsSuccess(campaigns) {
  return {
    type: FETCH_CAMPAIGNS_SUCCESS,
    payload: campaigns
  };
}

export function fetchCampaignsFailure(error) {
  return {
    type: FETCH_CAMPAIGNS_FAILURE,
    payload: error
  };
}

export function validateCampaignFields(props) {
  //note: we cant have /campaigns/validateFields because it'll match /campaigns/:id path!
  const request = axios.post(`${ROOT_URL}/campaigns/validate/fields`, props);

  return {
    type: VALIDATE_CAMPAIGN_FIELDS,
    payload: request
  };
}

export function validateCampaignFieldsSuccess() {
  return {
    type: VALIDATE_CAMPAIGN_FIELDS_SUCCESS
  };
}

export function validateCampaignFieldsFailure(error) {
  return {
    type: VALIDATE_CAMPAIGN_FIELDS_FAILURE,
    payload: error
  };
}

export function resetCampaignFields() {
  return {
    type: RESET_CAMPAIGN_FIELDS
  }
}
;


export function createCampaign(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/campaigns`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_CAMPAIGN,
    payload: request
  };
}

export function createCampaignSuccess(newCampaign) {
  return {
    type: CREATE_CAMPAIGN_SUCCESS,
    payload: newCampaign
  };
}

export function createCampaignFailure(error) {
  return {
    type: CREATE_CAMPAIGN_FAILURE,
    payload: error
  };
}

export function resetNewCampaign() {
  return {
    type: RESET_NEW_CAMPAIGN
  }
}
;

export function resetDeletedCampaign() {
  return {
    type: RESET_DELETED_CAMPAIGN
  }
}
;

export function fetchCampaign(id) {
  const request = axios.get(`${ROOT_URL}/campaigns/${id}`);

  return {
    type: FETCH_CAMPAIGN,
    payload: request
  };
}


export function fetchCampaignSuccess(activeCampaign) {
  return {
    type: FETCH_CAMPAIGN_SUCCESS,
    payload: activeCampaign
  };
}

export function fetchCampaignFailure(error) {
  return {
    type: FETCH_CAMPAIGN_FAILURE,
    payload: error
  };
}

export function resetActiveCampaign() {
  return {
    type: RESET_ACTIVE_CAMPAIGN
  }
}


export function deleteCampaign(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/campaigns/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_CAMPAIGN,
    payload: request
  };
}

export function deleteCampaignSuccess(deletedCampaign) {
  return {
    type: DELETE_CAMPAIGN_SUCCESS,
    payload: deletedCampaign
  };
}

export function deleteCampaignFailure(response) {
  return {
    type: DELETE_CAMPAIGN_FAILURE,
    payload: response
  };
}