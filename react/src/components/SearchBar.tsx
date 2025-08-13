import styles from './SearchBar.module.css';
import SearchIcon from './SearchIcon';

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <input 
        type="text" 
        className={`form-control ${styles.searchInput}`} 
        placeholder="Search..." 
      />
      <SearchIcon/>
    </div>
  );
}
