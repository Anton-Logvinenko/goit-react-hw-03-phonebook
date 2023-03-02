import PropTypes from 'prop-types';
import React from 'react';
import css from './contactForm.module.css'


class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  //   запись из input в state
  handleInputChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
      this.props.addNewContact(name, number)
          this.reset();
          }

  
  // Очистка формы
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label className={css.lable}> Name
          <input
          className={css.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <lable className={css.lable}> Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </lable>
        <button className={css.addBtn} type="submit">Add contact</button>
      </form>
    );
  }
}

export { ContactForm };

ContactForm.propTypes = {
  addNewContact: PropTypes.func,
};