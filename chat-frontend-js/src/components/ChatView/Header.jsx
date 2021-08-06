import { useContext } from 'react';
import { useParams } from 'react-router';

import { AppContext } from '../../App/context';
import { useFilteredUsers } from '../../utils/useFilteredUsers';
import { Status } from '../Status';

import styles from './index.module.scss';

export const ChatViewHeader = () => {
  const { conversationId } = useParams();
  const filteredUsers = useFilteredUsers();
  const { conversations } = useContext(AppContext);

  const conversation = conversations.find(
    (c) => c.conversationId === conversationId
  );
  
  if (!conversation) {
    return (
      <div>
        <p>
          uh oh, we couldn&apost find a conversation with id: ${conversationId}
        </p>
      </div>
    );
  }

  const viewedUser = filteredUsers.find((u) =>
    conversation.userIds.includes(u.userId)
  );

  if (!viewedUser) {
    return (
      <div>
        <p>uh oh, we couldn&apost find another user for this conversation</p>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.username}>{viewedUser.username}</h1>
        <Status isOnline={viewedUser.isOnline}/>
      </div>
    </div>
  );
};
