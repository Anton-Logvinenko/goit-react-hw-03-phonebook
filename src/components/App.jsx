import React from 'react';
import shortid from 'shortid';

import { ContactForm } from './contactForm/contactForm';
import { ContactList } from './contactList/contactList';
import { Filter } from './filter/filter';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  // запись из формы в state.contacts
  addNewContact = (name, number) => {
    const keyID = shortid.generate();
    const contact = {
      id: keyID,
      name: name,
      number: number,
    };

    // запись всех имен в массив
    let nameContact = [];
    this.state.contacts.forEach(contact =>
      nameContact.push(contact.name.toLocaleLowerCase())
    );

    // если имя совпадает, то Alert если нет, добавка в contacts
    nameContact.includes(name.toLocaleLowerCase())
      ? alert(`"${name}" is already in contacts!`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  // РАБОТА с localStorage
  // 1) если произошли изменения, то записываем components в   localeStorage
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // 2) если localStorage по ключу не пустой (!==null), то записываем информацию в state
  componentDidMount() {
    const saveContacts = localStorage.getItem('contacts');

    if (saveContacts !== null) {
      this.setState({ contacts: JSON.parse(saveContacts) });
      return;
    }
    this.setStates({ contacts: [] });
  }

  // Фильтрация
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalaizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalaizeFilter)
    );
  };

  // удаление из contacts
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    // отфильтрованный Contacts
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.conteinerApp}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm addNewContact={this.addNewContact} />
        <div>
          <h2 className={css.title}>Contacts</h2>
          <Filter filter={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
