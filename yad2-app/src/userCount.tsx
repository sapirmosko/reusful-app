import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function UserCounte() {
  const [userCount, setUserCount] = useState(1);

  useEffect(() => {
    socket.on('userCount', (count: number) => {
      setUserCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Number of users online: {userCount}</p>
    </div>
  );
}

export default UserCounte;