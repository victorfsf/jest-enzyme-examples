import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TagForm from './TagForm';
import styles from './Tag.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false,
      name: props.name,
    };
  }

  toggleFormOpen() {
    const { isFormOpen } = this.state;
    this.setState({
      isFormOpen: !isFormOpen,
    });
  }

  handleSubmit(e, name) {
    this.setState({ name });
  }

  render() {
    const { isFormOpen, name } = this.state;
    return isFormOpen ? (
      <TagForm
        name={name}
        onCancel={() => this.toggleFormOpen()}
        onSubmit={(e, values) => this.handleSubmit(e, values)}
      />
    ) : (
      <button
        className={classnames(styles.tag, styles.clickable)}
        onClick={() => this.toggleFormOpen()}
        type="button"
      >
        {name}
      </button>
    );
  }
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tag;
