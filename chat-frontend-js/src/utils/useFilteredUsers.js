import { useContext } from 'react';

import { AppContext } from '../App/context';

export const useFilteredUsers = () => {
  const { currentUser, users } = useContext(AppContext);
  // console.log('UseFilteredUsers ', users);
  // console.log('CURRENT USER: ', currentUser);
  // console.log('testing: ', test);
  return users.filter((u) => u.userId !== currentUser.userId);
};
