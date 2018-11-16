import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './TagForm.scss';
import tagStyles from './Tag.scss';

class TagForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.initialValues,
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
    const { onSubmit, onCancel } = this.props;
    const { values } = this.state;
    if (values.name.length > 0) {
      onSubmit(e, values);
    }
    onCancel();
  }

  handleChange(e) {
    const { id, value } = e.target;
    const { values } = this.state;
    this.setState({
      values: {
        ...values,
        [id]: value,
      },
    });
  }

  render() {
    const { onCancel } = this.props;
    const { values } = this.state;
    return (
      <form
        className={classnames(tagStyles.tag, styles.tagForm)}
        onSubmit={e => this.handleSubmit(e)}
      >
        <input
          type="text"
          id="name"
          onChange={e => this.handleChange(e)}
          value={values.name}
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
  initialValues: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TagForm;
