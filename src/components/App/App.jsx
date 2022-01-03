import { Component } from 'react/cjs/react.production.min';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

import s from './App.module.scss';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  { id: 'id-5', name: 'Vladislav Sl', number: '555-77-58' },
];

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  #localStorageKey = 'contacts';

  componentDidMount() {
    const isStorageContacts = localStorage.getItem(this.#localStorageKey);
    const contacts = JSON.parse(isStorageContacts);

    if (isStorageContacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        this.#localStorageKey,
        JSON.stringify(this.state.contacts),
      );
    }
  }

  addContact = data => {
    const isAdded = Object.values(this.state.contacts).find(
      contact => contact.name === data.name,
    );

    if (isAdded) {
      alert('contact is added');
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, data],
    }));
  };

  setFilter = data => {
    this.setState({ filter: data.target.value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const lowFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowFilter),
    );
  };

  deleteContact = name => {
    const { contacts } = this.state;

    const restContacts = contacts.filter(contact => contact.name !== name);
    console.log(restContacts);

    this.setState({ contacts: restContacts });
  };

  render() {
    const filteredContacts = this.filterContacts();

    return (
      <div className={s.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.setFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
