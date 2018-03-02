import { combineReducers } from 'redux';
import CampaignsReducer from './reducer_campaigns';
import UserReducer from './reducer_user';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import ResendEmailReducer from './reducer_resendEmail';
import UpdateEmailReducer from './reducer_updateEmail';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  validateFields: ValidateUserFieldsReducer,
  campaigns: CampaignsReducer, //<-- Campaigns
  form: formReducer, // <-- redux-form
  resendEmail: ResendEmailReducer,
  updateEmail: UpdateEmailReducer
});

export default rootReducer;
