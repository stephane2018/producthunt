import React from 'react';
import {Button} from 'antd';
import '../styles/';
export default class ButtonForNaBar extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        <button  className={`button ${this.props.typeButton}`}> {this.props.text}</button> 
      );
    }

  }
