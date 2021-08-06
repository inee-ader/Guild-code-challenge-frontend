import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';
import qs from 'qs';
import { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { v4 } from 'uuid';

import { AppContext } from '../../App/context';
import { SocketContext } from '../../socket/context';

import styles from './index.module.scss';
import closeX from './outline_close_black_24dp.png';

export const UsernameModal = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const parsedParams = qs.parse(search, { ignoreQueryPrefix: true });
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { socket } = useContext(SocketContext);

  const [username, setUsername] = useState('');

  useEffect(() => {
    if(currentUser && currentUser.username !== username && username === '')
      setUsername(currentUser.username);
  }, [currentUser]);

  const resetUsername = () => {
    setUsername(currentUser ? currentUser.username : '');
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const onCancel = () => {
    resetUsername();
    history.push(`${pathname}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser?.userId) {
      setCurrentUser({
        username,
        userId: currentUser.userId,
      });
    } else {
      setCurrentUser({
        username,
        userId: v4(),
      });
    };

    history.push(`${pathname}`);
    socket?.emit('username', currentUser);
    localStorage.setItem('username', document.getElementById('username').value);
    localStorage.setItem('userId', currentUser.userId);
  };

  const closeModal = () => {
    resetUsername();
    history.push(`${pathname}`);
  };

  return (
    <Dialog
      aria-label="Username input"
      className={styles.modalDialog}
      isOpen={Boolean(parsedParams.isEditingName) || false}
      onDismiss={() => history.push(`${pathname}`)}
    >
      <img 
        alt='close modal' 
        className={styles.closeX} 
        src={closeX} 
        onClick={closeModal} 
      />
      <form className={styles.formControl} onSubmit={handleSubmit}>
        <h1 className={styles.modalTitle}>Edit your name</h1>
        <p className={styles.modalSubTitle}>Edit how your name displays when others chat with you.</p>
        <label className={styles.editNameLabel} htmlFor="username">Name</label>
        <input
          aria-label="Edit your name"
          className={styles.nameInput}
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Enter your name"
          type="text"
          value={username}
        />
        <div className={styles.modalButtonContainer}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button type='submit' className={styles.saveButton}>Save</button>
        </div>
      </form>
    </Dialog>
  );
};
