import React, { Component } from 'react';

class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps() {
    console.log('getDerivedStateFromProps');
    return {};
  }

  static getDerivedStateFromError() {
    console.log('getDerivedStateFromError');
    return {};
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate');
  }

  componentDidCatch() {
    console.log('componentDidCatch');
  }

  render() {
    console.log('render');
    return <div />;
  }
}

export default Lifecycle;
