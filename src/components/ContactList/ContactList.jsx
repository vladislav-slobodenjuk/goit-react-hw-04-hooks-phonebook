import PropTypes from 'prop-types';
import s from './ContactList.module.scss';

export default function ContactList(props) {
  const { contacts, onDelete } = props;

  return (
    <ul className={s.contactList}>
      {contacts.map(({ name, number, id }) => (
        <li className={s.contactItem} key={id}>
          <p className={s.contactName}>
            {name}: {number}
          </p>
          <button
            className={s.contactButton}
            type="button"
            onClick={() => onDelete(name)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ),
  onDelete: PropTypes.func,
};
