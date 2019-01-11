import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import { validateString } from 'app/utils';
import { changeName, toggleForm } from './actions/Tag';

import styles from './TagForm.scss';
import tagStyles from './Tag.scss';

class TagForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.name,
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { value } = this.state;
    const { onSubmit, onCancel } = this.props;

    if (validateString(value)) {
      onSubmit(value);
      onCancel();
    }
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }

  render() {
    const { onCancel } = this.props;
    const { value } = this.state;
    return (
      <form
        className={classnames(tagStyles.tag, styles.tagForm)}
        onSubmit={e => this.handleSubmit(e)}
      >
        <input
          type="text"
          id="name"
          onChange={e => this.handleChange(e)}
          value={value}
          autoComplete="off"
          maxLength={35}
          placeholder="Please enter a tag name"
          ref={this.inputRef}
        />
        <button type="button" onClick={onCancel}>✖</button>
      </form>
    );
  }
}

TagForm.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

TagForm.defaultProps = {
  name: '',
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onSubmit: changeName,
  onCancel: toggleForm,
}, dispatch);

export default connect(null, mapDispatchToProps)(TagForm);
