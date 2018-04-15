import React, {PureComponent} from 'react';

export default class LocalVideo extends PureComponent{
  render(){
    return(
      <video controls style={{width:"100%", height:"100%"}} src={window.URL.createObjectURL(this.props.file)}></video>
    )
  }
}
