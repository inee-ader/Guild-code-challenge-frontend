import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import io from 'socket.io-client';
import { v4 } from 'uuid';

import { ChatView } from '../components/ChatView';
import { Header } from '../components/Header';
import { LeftPanel } from '../components/LeftPanel';
import { SelectConversation } from '../components/SelectConversation';
import { UsernameModal } from '../components/UsernameModal';
import { SocketContext } from '../socket/context';

import { AppContext } from './context';
import styles from './index.module.scss';

const socketPort = process.env.SOCKET_PORT || 3001;

export const App = () => {
  const [socket, setSocket] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const socketEndpoint = `http://localhost:${socketPort}`;
    let userId = localStorage.getItem('userId');
    let username = localStorage.getItem('username');

    if (!userId || !username) {

      userId = v4();
      username = `user${Date.now()}`;
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
    }

    setCurrentUser({
      userId,
      username,
    });

    setSocket(
      io(socketEndpoint, {
        transports: ['websocket'],
        upgrade: false,
        query: {
          userId,
          username,
        },
      })
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('conversations', (conversations) =>
        setConversations(conversations));

      setUsers([
        {
          username: 'Lindsay Carpenter',
          userId: '567856785678',
          isOnline: true,
        }, 
        {
          username: 'Devon Degreed',
          userId: '4566787342',
          isOnline: true,
        }, 
        {
          username: 'Angela Yang',
          userId: '097098685',
          isOnline: false,
        }, 
        {
          username: 'Bo Zhu',
          userId: '3453234456',
          isOnline: false,
        }
      ]);

      setChannels([
        {
          channelName: 'Guild-All',
          conversationId: '345678fghjk'
        }, 
        {
          channelName: 'Product-Team',
          conversationId: '67890ghjkl'
        }
      ]);
      
      socket.on('message', (message) =>
        setMessages((oldMessages) => [...oldMessages, message]));
      socket.on('messages', (messages) => setMessages(messages));
    }
  }, [socket]);


  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        messages,
        users,
        setUsers,
        conversations,
        channels
      }}
    >
      <div>
        <Header />
      </div>
      <div className={styles.main} >
        <SocketContext.Provider value={{ socket }}>
          <div className={styles.container}>
            <LeftPanel />
            <Switch>
              <Route exact path="/">
                <SelectConversation />
              </Route>
              <Route path="/conversation/:conversationId">
                <ChatView />
              </Route>
              <Route>not found :(
              </Route>
            </Switch>
          </div>
          <UsernameModal />
        </SocketContext.Provider>
      </div>
    </AppContext.Provider>
  );
};
