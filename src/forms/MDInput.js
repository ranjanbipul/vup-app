import React from 'react';
import PropTypes from 'prop-types';

const MDInput = (props) => (
  <div className="md-form form-sm">
      {props.icon && <i className={"fa fa-"+props.icon+" prefix"}></i>}
      <input type={props.type} id={"form_"+props.formName+"_input_"+props.name} name={props.name} value={props.value} onChange={props.controlFunc} className={"form-control validate"+(props.error? " is-invalid":"")} required={props.required? true:false} disabled={props.disabled? true:false} />
      {props.type!=="hidden" &&  <label htmlFor={"form_"+props.formName+"_input_"+props.name} className={(props.value?"active ":"")+(props.disabled? "disabled ":"")}>{props.title}</label>}
      <div className="invalid-feedback" style={{marginLeft:"2.2rem"}}>{props.feedbacks.join("<br/>")}</div>
  </div>
);

MDInput.defaultProps = {
  feedbacks :[],
  error: false
}

MDInput.propTypes = {
  type: PropTypes.oneOf(['text', 'number','password','hidden']).isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  feedbacks: PropTypes.array
};

export default MDInput
