import React, { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function UserCount() {
  const [userCount, setUserCount] = useState(0);
  const socketUrl = 'ws://localhost:3000';
  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userCountUpdated') {
        setUserCount(data.data);
        console.log(data);
        
      }
    },
  });

  if (readyState !== ReadyState.OPEN) {
    return  <div>Connecting to server...</div>;
  }

  return <div> {userCount} users online </div>;
}

export default UserCount;
