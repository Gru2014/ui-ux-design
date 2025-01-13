import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

export const users = [
  {
    id: '1',
    name: 'Alice',
    color: '#FF6B6B',
    position: { x: 100, y: 100 }
  },
  {
    id: '2',
    name: 'Bob',
    color: '#4ECDC4',
    position: { x: 200, y: 200 }
  },
  {
    id: '3',
    name: 'Charlie',
    color: '#45B7D1',
    position: { x: 300, y: 300 }
  }
];

const RealTimeCollaboration: React.FC = () => {
  const { selectedElement } = useAppContext();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {users.map((user) => (
        <div
          key={user.id}
          className="absolute flex items-center gap-2"
          style={{
            top: `${user.position.y}px`,
            left: `${user.position.x}px`,
            zIndex: 1000
          }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            style={{ backgroundColor: user.color }}
          >
            {user.name[0].toUpperCase()}
          </div>
          <span className="bg-white px-2 py-1 rounded shadow text-sm">
            {user.name}
          </span>
        </div>
      ))}
    </div>
  );
};


export default RealTimeCollaboration;
