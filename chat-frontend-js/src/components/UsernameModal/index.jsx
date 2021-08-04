import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';
import qs from 'qs';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { v4 } from 'uuid';

import { AppContext } from '../../App/context';
import { SocketContext } from '../../socket/context';

import styles from './index.module.scss';
import closeX from './outline_close_black_24dp.png';

export const UsernameModal= () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const parsedParams = qs.parse(search, { ignoreQueryPrefix: true });
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { socket } = useContext(SocketContext);

  const handleChange = (e) => {
    console.log('HANDLE CHANGE: ', currentUser?.userId);
    console.log('VALUE: ', e.target.value);
    console.log('Current User Id: ', currentUser.userId);

    if (currentUser?.userId) {
      setCurrentUser({
        username: e.target.value,
        userId: currentUser.userId,
      });
    } else {
      setCurrentUser({
        username: e.target.value,
        userId: v4(),
      });
    }
  };

  const onCancel = () => {
    console.log('cancelling');
    history.push(`${pathname}`);
    window.location.reload(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`${pathname}`);
    socket?.emit('username', currentUser);
    localStorage.setItem('username', document.getElementById('username').value);
    localStorage.setItem('userId', currentUser.userId);
  };

  const closeModal = () => {
    history.push(`${pathname}`);
  };

  return (
    <Dialog
      className={styles.modalDialog}
      aria-label="Username input"
      isOpen={Boolean(parsedParams.isEditingName) || false}
      onDismiss={() => history.push(`${pathname}`)}
    >
      <img className={styles.closeX} src={closeX} alt='close modal' onClick={closeModal} />
      <form className={styles.formControl} onSubmit={handleSubmit}>
        <h1 className={styles.modalTitle}>Edit your name</h1>
        <p className={styles.modalSubTitle}>Edit how your name displays when others chat with you.</p>
        <label className={styles.editNameLabel} htmlFor="username">Name</label>
        <input
          className={styles.nameInput}
          aria-label="Edit your name"
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={currentUser ? currentUser.username : ''}
          placeholder="Enter your name"
        />
        <div className={styles.modalButtonContainer}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button type='submit' className={styles.saveButton}>Save</button>
        </div>
      </form>
    </Dialog>
  );
};
