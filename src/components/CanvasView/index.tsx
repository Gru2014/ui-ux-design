import React from 'react'
import { CanvasElement } from '../../types/types';
import { FaLock } from 'react-icons/fa';
import GroupedElements from '../GroupedElements';
import { users } from '../RealTimeCollaboration';
import { useZoomPan } from '../../hooks/useZoomPan';

interface CanvasViewProps extends ReturnType<typeof useZoomPan> {
    canvas: any;
    selectedElement: any;
    onDrop: (e: React.DragEvent) => void;
    onElementClick: (element: CanvasElement) => void;
    onContextMenu: (e: React.MouseEvent, elementId?: string) => void;
  }
  
  const CanvasView: React.FC<CanvasViewProps> = ({
    containerRef,
    zoomLevel,
    offset,
    handleWheel,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    isPanning,
    canvas,
    selectedElement,
    onDrop,
    onElementClick,
    onContextMenu,
  }) => {
    const shouldGroup = zoomLevel < 1;
  
    const calculateGroupCenter = (elements: CanvasElement[]) => {
      const sumX = elements.reduce((sum, el) => sum + el.position.x, 0);
      const sumY = elements.reduce((sum, el) => sum + el.position.y, 0);
      return {
        x: sumX / elements.length,
        y: sumY / elements.length,
      };
    };
  
    const groupElementsByProximity = (elements: CanvasElement[]) => {
      const PROXIMITY_THRESHOLD = 100;
      const groups: CanvasElement[][] = [];
  
      elements.forEach((element) => {
        let addedToGroup = false;
  
        for (const group of groups) {
          const groupCenter = calculateGroupCenter(group);
          const distance = Math.sqrt(
            Math.pow(element.position.x - groupCenter.x, 2) +
              Math.pow(element.position.y - groupCenter.y, 2)
          );
  
          if (distance < PROXIMITY_THRESHOLD) {
            group.push(element);
            addedToGroup = true;
            break;
          }
        }
  
        if (!addedToGroup) {
          groups.push([element]);
        }
      });
  
      return groups;
    };
  
    const renderElements = () => {
      if (!shouldGroup) {
        return canvas?.elements.map((el: CanvasElement) => (
          <div key={el.id} className="relative">
            <div
              className={`absolute p-2 bg-blue-500 text-white rounded shadow cursor-pointer hover:bg-blue-700 ${
                selectedElement?.element.id === el.id
                  ? "ring-2 ring-blue-300"
                  : ""
              } ${el.lockedBy ? "opacity-50" : ""}`}
              style={{
                top: `${el.position.y}px`,
                left: `${el.position.x}px`,
              }}
              onContextMenu={(e) => onContextMenu(e, el.id)}
              onClick={() => onElementClick(el)}
            >
              {el.label}
              {el.lockedBy && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaLock className="text-xs text-gray-600" />
                  </div>
                </div>
              )}
            </div>
            {el.lockedBy && (
              <div
                className="absolute flex items-center"
                style={{
                  top: `${el.position.y - 20}px`,
                  left: `${el.position.x}px`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center text-xs font-bold shadow-sm"
                  style={{
                    borderColor: users.find((u) => u.id === el.lockedBy)?.color,
                  }}
                >
                  {users.find((u) => u.id === el.lockedBy)?.name[0].toUpperCase()}
                </div>
              </div>
            )}
          </div>
        ));
      }
  
      const groups = groupElementsByProximity(canvas?.elements || []);
      return groups.map((group, idx) => (
        <GroupedElements
          key={idx}
          elements={group}
          position={calculateGroupCenter(group)}
          onExpand={() => handleWheel({ deltaY: -250 } as React.WheelEvent)}
          onContextMenu={(e) => onContextMenu(e, group[0].id)}
        />
      ));
    };
  
    return (
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden z-0"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomLevel})`,
          transition: "transform 0.1s ease-out",
          cursor: isPanning ? "grabbing" : "grab",
        }}
      >
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 gap-0.5 pointer-events-none">
          {[...Array(400)].map((_, idx) => (
            <div key={idx} className="w-full h-full bg-gray-200" />
          ))}
        </div>
        {renderElements()}
      </div>
    );
  };

export default CanvasView