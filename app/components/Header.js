import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import './css/_Header.css';

@connect(({ posts }) => ({ votes: posts.votes }),

)
export default class Header extends Component {
  static propTypes = {
    votes: PropTypes.number,
  };

  render() {
    return (
      <div className="header">
        {/* eslint-disable-next-line */}
        <div>Total Votes For This Page: {this.props.votes}</div>
      </div>
    );
  }
}
