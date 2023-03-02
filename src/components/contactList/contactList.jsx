import PropTypes from 'prop-types';
import React from 'react';
import css from './contactList.module.css';

function ContactList({ contacts, onDelete }) {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <p className={css.text}>
            {name} : {number}
          </p>
          <button
            className={css.btnDelete}
            type="button"
            onClick={() => {
              onDelete(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export { ContactList };

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired)).isRequired,
  onDelete: PropTypes.func,
};
