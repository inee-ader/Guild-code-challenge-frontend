import styles from './index.module.scss';

export const Channels = () => {
 
  return (
    <div>
      <h1 className={styles.listTitle}>CHANNELS</h1>
      <div>
        <ul className={styles.channelUl}>
          <li className={styles.channelLi} key='456678'>Guild-All</li>
          <li className={styles.channelLi} key='7890234'>Product-Team</li>
        </ul>
      </div>
    </div>
  );
};