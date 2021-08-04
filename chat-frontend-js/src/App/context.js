import { createContext } from 'react';

const defaultAppContext = {
  test: 'Hello I am a TEST!',
  conversations: [],
  messages: [],
  setCurrentUser: () => null,
  setUsers: () => null,
  users: [
    {
      username: 'Lindsay Carpenter',
      userId: '567856785678',
      isOnline: true,
      conversations: '' // ids of conversations user is part of,
    }, 
    {
      username: 'Devon Degreed',
      userId: '4566787342',
      isOnline: true,
      conversations: ''
    }, 
    {
      username: 'Angela Yang',
      userId: '097098685',
      isOnline: false,
      conversations: ''
    }, 
    {
      username: 'Bo Zhu',
      userId: '3453234456',
      isOnline: false,
      conversations: ''
    }, 
    {
      username: 'LIME',
      userId: '45678789',
      isOnline: false,
      conversations: ''
    }
  ],
  channels: [
    {
      channelName: 'Guild-All',
      conversationId: ''
    }, 
    {
      channelName: 'Product-Team',
      conversationId: ''
    }
  ]
};

export const AppContext = createContext(defaultAppContext);
