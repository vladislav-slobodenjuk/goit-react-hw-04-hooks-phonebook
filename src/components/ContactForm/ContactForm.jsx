import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './ContactForm.module.scss';

export default function ContactForm({ onSubmit }) {
  const [userName, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === 'userName') {
      setName(value);
    }

    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({
      name: userName,
      number: number,
    });
  };

  return (
    <form className={s.mainForm} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        className={s.nameInput}
        type="text"
        name="userName"
        id="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={userName}
        onChange={handleInputChange}
      />
      <label htmlFor="number">Number</label>
      <input
        className={s.telInput}
        type="tel"
        id="number"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleInputChange}
      />
      <button className={s.submitButton} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
