import { Link } from 'react-router-dom';

import editIcon from './edit_icon.png';
import styles from './index.module.scss';

export const NewMessageButton = () => (
  <Link to="/">
    <button className={styles.button} type="button">
      New message
      <img 
        alt='new message' 
        className={styles.buttonIcon} 
        src={editIcon} 
      />
    </button>
  </Link>
);
