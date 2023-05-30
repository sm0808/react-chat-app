import React, { useState, useEffect } from 'react';
import './ChatApp.css';
import senderIcon from './user-icon.png';

const ChatApp = ({ firebase }) => {
  const [samMessages, setSamMessages] = useState([]);
  const [alanMessages, setAlanMessages] = useState([]);
  const [newSamMessage, setNewSamMessage] = useState('');
  const [newAlanMessage, setNewAlanMessage] = useState('');

  const firestore = firebase.firestore();
  const messagesRef = firestore.collection('chats').doc('messages');

  // Fetch messages from Firestore on component mount
  useEffect(() => {
    const unsubscribe = messagesRef.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data && data.messages) {
        const sortedMessages = data.messages.sort((a, b) => a.timestamp - b.timestamp);
        setSamMessages(sortedMessages);
        setAlanMessages(sortedMessages);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  // Handle Sam's input change
  const handleSamInputChange = (event) => {
    setNewSamMessage(event.target.value);
  };

  // Handle Alan's input change
  const handleAlanInputChange = (event) => {
    setNewAlanMessage(event.target.value);
  };

  // Handle Sam's send message
  const handleSamSendMessage = () => {
    if (newSamMessage.trim() !== '') {
      const updatedMessages = [
        ...samMessages,
        { sender: 'Sam', content: newSamMessage, timestamp: new Date() }
      ];
      messagesRef.set({ messages: updatedMessages });
      setNewSamMessage('');
    }
  };

  // Handle Alan's send message
  const handleAlanSendMessage = () => {
    if (newAlanMessage.trim() !== '') {
      const updatedMessages = [
        ...alanMessages,
        { sender: 'Alan', content: newAlanMessage, timestamp: new Date() }
      ];
      messagesRef.set({ messages: updatedMessages });
      setNewAlanMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="message-container">
          {samMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'Sam' ? 'left-aligned' : 'right-aligned'}`}
            >
              <div className="sender">
                <img src={senderIcon} alt="Sender Icon" className="sender-icon" />
                {message.sender}
              </div>
              <div className="content">{message.content}</div>
              <div className="timestamp">{message.timestamp.toDate().toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={newSamMessage}
            onChange={handleSamInputChange}
          />
          <button onClick={handleSamSendMessage}>Send</button>
        </div>
      </div>
      <div className="chat-box">
        <div className="message-container">
          {alanMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'Sam' ? 'right-aligned' : 'left-aligned'}`}
            >
              <div className="sender">
                <img src={senderIcon} alt="Sender Icon" className="sender-icon" />
                {message.sender}
              </div>
              <div className="content">{message.content}</div>
              <div className="timestamp">{message.timestamp.toDate().toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={newAlanMessage}
            onChange={handleAlanInputChange}
          />
          <button onClick={handleAlanSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
