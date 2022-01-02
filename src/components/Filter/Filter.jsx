import PropTypes from 'prop-types';
import s from './Filter.module.scss';

export default function Filter({ value, onChange }) {
  return (
    <>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        className={s.filterInput}
        id="filter"
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
