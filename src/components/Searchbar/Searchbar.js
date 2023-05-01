import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as SearchIcon } from '../icons/search-icon.svg';

const Searchbar = props => {
  const { onSubmit } = props;
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Please enter search query');
    }
    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
          <SearchIcon width="25" height="25" />
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
