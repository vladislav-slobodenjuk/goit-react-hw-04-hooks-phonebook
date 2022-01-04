import { useState, useEffect } from 'react';

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

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  const localStorageKey = 'contacts';

  useEffect(() => {
    const isStorageContacts = localStorage.getItem(localStorageKey);
    const storageContacts = JSON.parse(isStorageContacts);

    if (isStorageContacts) {
      setContacts(storageContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const isAdded = Object.values(contacts).find(
      contact => contact.name === data.name,
    );

    if (isAdded) {
      alert('contact is added');
      return;
    }
    setContacts(contacts => [...contacts, data]);
  };

  const setContactsFilter = data => {
    setFilter(data.target.value);
  };

  const filterContacts = () => {
    const lowFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowFilter),
    );
  };
  const filteredContacts = filterContacts();

  const deleteContact = name => {
    const restContacts = contacts.filter(contact => contact.name !== name);

    setContacts(restContacts);
  };

  return (
    <div className={s.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={setContactsFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}
