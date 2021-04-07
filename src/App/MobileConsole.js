import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const MobileConsole = () => {
  const [messages, setMessages] = useState([]);
  const message = useSelector((state) => state.app.log.message);
  const count = useSelector((state) => state.app.log.count);
  useEffect(() => {
    console.log(message);
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    const newLog = `${hours}:${mins}:${secs} -> ${message}`;
    setMessages((messages) => [newLog, ...messages]);
  }, [message, count]);
  return (
    <div id='mobileConsole'>
      {messages.map((message, i) => (
        <p key={`message-${i}`}>{message}</p>
      ))}
    </div>
  );
};
