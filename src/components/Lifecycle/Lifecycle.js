/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tag from 'components/Tag';

class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLog('constructor', props);
  }

  static getDerivedStateFromProps(props) {
    console.log(`${props.type} getDerivedStateFromProps`);
    return {};
  }

  componentDidMount() {
    this.handleLog('componentDidMount');
  }

  shouldComponentUpdate() {
    this.handleLog('shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    this.handleLog('componentDidUpdate');
  }

  componentWillUnmount() {
    this.handleLog('componentWillUnmount');
  }

  getSnapshotBeforeUpdate() {
    this.handleLog('getSnapshotBeforeUpdate');
    return null;
  }

  handleLog(method, props = this.props) {
    const { type } = props;
    console.log(`${type} ${method}`);
  }

  render() {
    const { type } = this.props;
    this.handleLog('render');
    return <Tag name={type} />;
  }
}

Lifecycle.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Lifecycle;
