import React, { useEffect, useState } from 'react';
import Peer from 'peerjs';

function Receiver() {
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState('');

  useEffect(() => {
    const peer = new Peer(); // Create a Peer instance
    setPeer(peer);

    peer.on('open', (id) => {
      console.log('Your peer ID is: ' + id);
    });

    peer.on('connection', (dataConnection) => {
      dataConnection.on('data', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    });

    return () => {
      peer.destroy(); // Clean up Peer instance when unmounting
    };
  }, []);

  const connectToSender = () => {
    const dataConnection = peer.connect(senderId);
    dataConnection.on('open', () => {
      console.log('Connected to the sender.');
    });
  };

  return (
    <div>
      <h1>Receiver</h1>
      <div>
        <input
          type="text"
          placeholder="Sender's ID"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
        />
        <button onClick={connectToSender}>Connect</button>
      </div>
      <div>
        <h2>Messages from Sender:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Receiver;
