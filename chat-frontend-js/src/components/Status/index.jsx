import styles from './index.module.scss';

export const Status = ({ isOnline, hidden }) => {
  
  let onlineStyle = styles.offline; 
  let onlineStatus = 'Offline';

  if (isOnline) {
    onlineStyle = styles.online;
    onlineStatus = 'Online';
  };

  return (
    <div className={onlineStyle}>
      <div className={styles.statusDot}>
        <p className={hidden ? styles.hidden : styles.status}>{onlineStatus}</p>
      </div>
    </div>
  );
};



