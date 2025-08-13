import SearchIcon from './SearchIcon';
import styles from './SearchBar.module.css';

const SearchBar = () => (
  <div className={styles.searchContainer}>
    <input
      type="text"
      className={`form-control ${styles.searchInput}`}
      
      placeholder="Search..."
    />
    <SearchIcon />
  </div>
);

export default SearchBar;
