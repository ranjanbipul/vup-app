import React from 'react';
import PropTypes from 'prop-types';

const MDCheckbox = (props) => (
  <div className="form-group">
    <input type="checkbox" id={"form_"+props.formName+"_input_"+props.name} name={props.name} checked={props.value?true:false} onChange={props.controlFunc} disabled={props.disabled? true:false} />
    <label htmlFor={"form_"+props.formName+"_input_"+props.name}>{props.icon && <i className={"fa fa-"+props.icon+" prefix"}></i>} {props.title}</label>
  </div>
);

MDCheckbox.defaultProps = {
  feedbacks :[],
  error: false
}

MDCheckbox.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
  ]).isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  feedbacks: PropTypes.array
};

export default MDCheckbox
