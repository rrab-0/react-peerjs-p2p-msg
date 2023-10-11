import React, { useEffect, useState } from 'react';
import Peer from 'peerjs';

function Sender() {
  const [peer, setPeer] = useState(null);
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const peer = new Peer(); // Create a Peer instance
    setPeer(peer);

    peer.on('open', (id) => {
      console.log('Your peer ID is: ' + id);
    });

    peer.on('connection', (dataConnection) => {
      setConnection(dataConnection);
    });

    return () => {
      peer.destroy(); // Clean up Peer instance when unmounting
    };
  }, []);

  const connectToReceiver = () => {
    const dataConnection = peer.connect(receiverId);
    setConnection(dataConnection);

    dataConnection.on('open', () => {
      console.log('Connected to the receiver.');
    });
  };

  const sendMessage = () => {
    if (connection) {
      connection.send(message);
    }
  };

  return (
    <div>
      <h1>Sender</h1>
      <div>
        <input
          type="text"
          placeholder="Receiver's ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <button onClick={connectToReceiver}>Connect</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Sender;
