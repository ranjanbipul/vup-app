import React from 'react';
import PropTypes from 'prop-types';

const MDFile = (props) => (
  <div className="file-field">
        <div className="btn btn-primary btn-sm">
          {props.icon && <i className={"fa fa-"+props.icon+" prefix"}></i>}
          <span>{props.title}</span>
          <input id={"form_"+props.formName+"_input_"+props.name} name={props.name} type="file" onChange={props.controlFunc} required={props.required? true:false} disabled={props.disabled? true:false} />
      </div>
      <div className="file-path-wrapper">
         <input className={"form-control file-path validate"+(props.error? " is-invalid":"")} type="text" placeholder={props.placeholder} />
         <div className="invalid-feedback" style={{marginLeft:"2.2rem"}}>{props.feedbacks.join("<br/>")}</div>
      </div>
  </div>
);

MDFile.defaultProps = {
  feedbacks :[],
  error: false
}

MDFile.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  feedbacks: PropTypes.array
};

export default MDFile
