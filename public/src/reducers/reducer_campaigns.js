import {
	FETCH_CAMPAIGNS, FETCH_CAMPAIGNS_SUCCESS, FETCH_CAMPAIGNS_FAILURE, RESET_CAMPAIGNS,
	FETCH_CAMPAIGN, FETCH_CAMPAIGN_SUCCESS,  FETCH_CAMPAIGN_FAILURE, RESET_ACTIVE_CAMPAIGN,
	CREATE_CAMPAIGN, CREATE_CAMPAIGN_SUCCESS, CREATE_CAMPAIGN_FAILURE, RESET_NEW_CAMPAIGN,
	DELETE_CAMPAIGN, DELETE_CAMPAIGN_SUCCESS, DELETE_CAMPAIGN_FAILURE, RESET_DELETED_CAMPAIGN,
  VALIDATE_CAMPAIGN_FIELDS,VALIDATE_CAMPAIGN_FIELDS_SUCCESS, VALIDATE_CAMPAIGN_FIELDS_FAILURE, RESET_CAMPAIGN_FIELDS
} from '../actions/campaigns';


	const INITIAL_STATE = { campaignsList: {campaigns: [], error:null, loading: false},  
							newCampaign:{campaign:null, error: null, loading: false}, 
							activeCampaign:{campaign:null, error:null, loading: false}, 
							deletedCampaign: {campaign: null, error:null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_CAMPAIGNS:// start fetching campaigns and set loading = true
  	return { ...state, campaignsList: {campaigns:[], error: null, loading: true} }; 
  case FETCH_CAMPAIGNS_SUCCESS:// return list of campaigns and make loading = false
    return { ...state, campaignsList: {campaigns: action.payload, error:null, loading: false} };
  case FETCH_CAMPAIGNS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, campaignsList: {campaigns: [], error: error, loading: false} };
  case RESET_CAMPAIGNS:// reset campaignList to initial state
    return { ...state, campaignsList: {campaigns: [], error:null, loading: false} };

  case FETCH_CAMPAIGN:
    return { ...state, activeCampaign:{...state.activeCampaign, loading: true}};
  case FETCH_CAMPAIGN_SUCCESS:
    return { ...state, activeCampaign: {campaign: action.payload, error:null, loading: false}};
  case FETCH_CAMPAIGN_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activeCampaign: {campaign: null, error:error, loading:false}};
  case RESET_ACTIVE_CAMPAIGN:
    return { ...state, activeCampaign: {campaign: null, error:null, loading: false}};

  case CREATE_CAMPAIGN:
  	return {...state, newCampaign: {...state.newCampaign, loading: true}}
  case CREATE_CAMPAIGN_SUCCESS:
  	return {...state, newCampaign: {campaign:action.payload, error:null, loading: false}}
  case CREATE_CAMPAIGN_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, newCampaign: {campaign:null, error:error, loading: false}}
  case RESET_NEW_CAMPAIGN:
  	return {...state,  newCampaign:{campaign:null, error:null, loading: false}}


  case DELETE_CAMPAIGN:
   	return {...state, deletedCampaign: {...state.deletedCampaign, loading: true}}
  case DELETE_CAMPAIGN_SUCCESS:
  	return {...state, deletedCampaign: {campaign:action.payload, error:null, loading: false}}
  case DELETE_CAMPAIGN_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, deletedCampaign: {campaign:null, error:error, loading: false}}
  case RESET_DELETED_CAMPAIGN:
  	return {...state,  deletedCampaign:{campaign:null, error:null, loading: false}}

  case VALIDATE_CAMPAIGN_FIELDS:
    return {...state, newCampaign:{...state.newCampaign, error: null, loading: true}}
  case VALIDATE_CAMPAIGN_FIELDS_SUCCESS:
    return {...state, newCampaign:{...state.newCampaign, error: null, loading: false}}
  case VALIDATE_CAMPAIGN_FIELDS_FAILURE:
    let result = action.payload;
    if(!result) {
      error = {message: action.payload.message};
    } else {
      error = {title: result.title, categories: result.categories, description: result.description};
    }
    return {...state, newCampaign:{...state.newCampaign, error: error, loading: false}}
  case RESET_CAMPAIGN_FIELDS:
    return {...state, newCampaign:{...state.newCampaign, error: null, loading: null}}
  default:
    return state;
  }
}
