import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validateCampaignFields, validateCampaignFieldsSuccess, validateCampaignFieldsFailure } from '../actions/campaigns';
import { createCampaign, createCampaignSuccess, createCampaignFailure, resetNewCampaign } from '../actions/campaigns';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Enter categories';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(validateCampaignFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (response.payload.status != 200 || data.title || data.categories || data.description) {
        //let other components know of error by updating the redux` state
        dispatch(validateCampaignFieldsFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validateCampaignFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateCampaign = (values, dispatch) => {
  return dispatch(createCampaign(values, sessionStorage.getItem('jwtToken')))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createCampaignFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createCampaignSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
}



class CampaignsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newCampaign.campaign && !nextProps.newCampaign.error) {
      this.context.router.push('/');
    }
  }

  renderError(newCampaign) {
    if (newCampaign && newCampaign.error && newCampaign.error.message) {
      return (
        <div className="alert alert-danger">
          { newCampaign ? newCampaign.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  render() {
    const {handleSubmit, submitting, newCampaign} = this.props;
    return (
      <div className='container'>
        { this.renderError(newCampaign) }
        <form onSubmit={ handleSubmit(validateAndCreateCampaign) }>
          <Field
                 name="title"
                 type="text"
                 component={ renderField }
                 label="Title*" />
          <Field
                 name="categories"
                 type="text"
                 component={ renderField }
                 label="Categories*" />
          <Field
                 name="content"
                 component={ renderTextArea }
                 label="Content*" />
          <div>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </button>
            <Link
                  to="/"
                  className="btn btn-error"> Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'CampaignsForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate
})(CampaignsForm)
