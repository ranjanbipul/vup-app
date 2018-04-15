import React from 'react'

const Loader = (props) => (
  <div style={{display:"flex", justifyContent: "center", alignItems: "center", color:"#3F729B", flexDirection: "column",...props.style}}>
    <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
    <span>Loading</span>
  </div>
)

export default Loader;
