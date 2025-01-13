import { MouseEvent, useRef, useState, WheelEvent } from "react";

export const useZoomPan = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPanPosition = useRef({ x: 0, y: 0 });
  const SNAP_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const handleWheel = (event: WheelEvent) => {
    const zoomFactor = -event.deltaY * 0.001;
    const unsnappedZoom = zoomLevel + zoomFactor;
    const newZoom = SNAP_LEVELS.reduce((prev, curr) => 
      Math.abs(curr - unsnappedZoom) < Math.abs(prev - unsnappedZoom) ? curr : prev
    );
    setZoomLevel(newZoom);
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    setIsPanning(true);
    lastPanPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isPanning) return;
    const dx = event.clientX - lastPanPosition.current.x;
    const dy = event.clientY - lastPanPosition.current.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPanPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };

  return {
    containerRef,
    zoomLevel,
    offset,
    handleWheel,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    isPanning,
  };
};
