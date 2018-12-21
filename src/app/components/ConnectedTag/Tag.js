import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import { toggleForm } from './actions/Tag';
import TagForm from './TagForm';
import styles from './Tag.scss';

const Tag = ({ isFormOpen, name, onClick }) => (
  isFormOpen ? (
    <TagForm name={name} />
  ) : (
    <button
      className={classnames(styles.tag, styles.clickable)}
      onClick={onClick}
      type="button"
    >
      {name}
    </button>
  )
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  isFormOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Tag.defaultProps = {
  isFormOpen: false,
};

const mapStateToProps = state => state.tag; // state.tag = { name, isFormOpen }

const mapDispatchToProps = dispatch => bindActionCreators({
  onClick: toggleForm,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Tag);
