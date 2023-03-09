import PropTypes from 'prop-types';
import React from 'react';
import css from './filter.module.css';

function Filter({ filter, onChange }) {
  return (
    <lable className={css.filterLable}>
      Find contacts
      <input
        className={css.filterInput}
        type="text"
        value={filter}
        onChange={onChange}
      />
    </lable>
  );
}

export { Filter };

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};

