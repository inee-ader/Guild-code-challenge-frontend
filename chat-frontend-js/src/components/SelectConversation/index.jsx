import { useContext, useState } from 'react';

import { AppContext } from '../../App/context';
import { SocketContext } from '../../socket/context';
import { useFilteredUsers } from '../../utils/useFilteredUsers';

import styles from './index.module.scss';

export const SelectConversation = () => {
  const { socket } = useContext(SocketContext);
  const { currentUser,...values } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState();
  let users = useFilteredUsers();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    socket?.emit('startConversation', {
      userId: currentUser?.userId,
      recipientId: selectedUser,
    });
    e.target.reset();
    setSelectedUser(null);
  };
  console.log(values);
  return (
    <div className={styles.container}>
      <h1 className={styles.newMessageTitle}>New Message</h1>
      <p className={styles.newMessageSubTitle}>
        Select an existing conversation from the left or pick a new user here to start chatting:
      </p>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="user">User</label>
        <br/>
        <div className={styles.formControls}>
          <select
            className={styles.select}
            defaultValue={'select-a-user'}
            id="user"
            name="user"
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser}
          >
            <option disabled value="select-a-user">
              Select one
            </option>
            {users.map((u) => (
              <option key={`user-select-option-${u.userId}`} value={u.userId}>
                {u.username}
              </option>
            ))}
          </select>
          <input
            className={styles.startButton}
            disabled={!selectedUser}
            type="submit"
            value="Start conversation"
          />
        </div>
      </form>
    </div>
  );
};
