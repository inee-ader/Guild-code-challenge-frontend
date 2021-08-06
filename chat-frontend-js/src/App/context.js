import { createContext } from 'react';

const defaultAppContext = {
  conversations: [],
  messages: [],
  setCurrentUser: () => null,
  setUsers: () => null,
  users: [],
  channels: []
};

export const AppContext = createContext(defaultAppContext);
