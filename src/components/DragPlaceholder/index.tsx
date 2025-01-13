import React from 'react'

interface DragPlaceholderProps {
    position: { x: number, y: number };
    elementType: string;
  }


const DragPlaceholder: React.FC<DragPlaceholderProps> = ({ position, elementType }) => {
    return (
      <div 
        className="absolute border-2 border-dashed border-blue-400 bg-blue-100 bg-opacity-30 rounded transition-all duration-200"
        style={{
          left: position.x,
          top: position.y,
          width: 100,
          height: 60,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <div className="flex items-center justify-center h-full text-blue-500 opacity-70">
          {elementType}
        </div>
      </div>
    );
  };

export default DragPlaceholder