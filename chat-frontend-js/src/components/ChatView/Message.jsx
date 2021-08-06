import { format, formatRelative } from 'date-fns';
import { useContext } from 'react';

import { AppContext } from '../../App/context';

import styles from './index.module.scss';

export const ChatViewMessage = ( message ) => {
  const { currentUser, users } = useContext(AppContext);

  let sender;

  if(message.senderId === currentUser.userId )
    sender = currentUser;
  else
    sender = users.find((u) => u.userId === message.senderId);


  const relativeDay = formatRelative(new Date(message.createdAt), new Date())
    .split('at')[0]
    .trim();

  return (
    <div>
      <span className={styles.messageContainer}>
        <div className={styles.senderInfo}>
          <div className={styles.senderInfo}>
            <p className={styles.senderName}>{sender?.username}</p>
            <p className={styles.sentAt}>
              {format(new Date(message.createdAt), 'h:mm a ')} {relativeDay}
            </p>
          </div>
        </div>
      </span>
      <p className={styles.message}>{message.body}</p>
    </div>
  );
};
