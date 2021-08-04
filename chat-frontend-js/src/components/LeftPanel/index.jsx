import { useContext } from 'react';

import { AppContext } from '../../App/context';
import { useFilteredUsers } from '../../utils/useFilteredUsers';
import { NewMessageButton } from '../NewMessageButton';

import { ConversationListItem } from './ConversationListItem';
import styles from './index.module.scss';

export const LeftPanel = ({ handleDeleteConversation}) => {
  const { conversations } = useContext(AppContext);
  const filteredUsers = useFilteredUsers();

  return (
    <div className={styles.container}>
      <NewMessageButton />
      <h2 className={styles.directMessagesTitle}>DIRECT MESSAGES</h2>
      <ul className={styles.messageUl}>
        {conversations.map((c) => {
          const otherUser = filteredUsers.find((u) =>
            c.userIds.includes(u.userId)
          );
          if (!otherUser) {
            return null;
          }
          return (
            <ConversationListItem
              conversationId={c.conversationId}
              key={c.conversationId}
              {...otherUser}
            />
          );
        })}
      </ul>
    </div>
  );
};
