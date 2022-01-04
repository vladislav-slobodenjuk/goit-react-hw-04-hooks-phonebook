import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import s from './ContactForm.module.scss';

export default function ContactForm(props) {
  const { onSubmit } = props;

  const [userName, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'userName':
        setName(value);
        // setId(nanoid(8));
        break;

      case 'number':
        setNumber(value);
        // setId(nanoid(8));
        break;

      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const idResult = await nanoid(8);
    setId(idResult);

    const userObj = {
      id: idResult,
      name: userName,
      number: number,
    };

    onSubmit(userObj);
    // this.props.onSubmit(this.state);
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
