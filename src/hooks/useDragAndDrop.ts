import { useEffect, useState } from "react";
import { DragData } from "../types/types";


export const useDragAndDrop = () => {
  const [dragData, setDragData] = useState<DragData | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (data: DragData,) => {
    setDragData(data);
  };
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setDragPosition({ x: e.clientX, y: e.clientY });
    };

    if (dragData) {
      window.addEventListener('mousemove', updatePosition);
    }

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, [dragData]);


  const handleDrag = (e: DragEvent) => {
    setDragPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = () => {
    setDragData(null);
  };

  const getDragData = () => dragData;

  return {
    handleDragStart,
    handleDrag, 
    handleDragEnd,
    dragData,
    getDragData,
    dragPosition
  };
};
