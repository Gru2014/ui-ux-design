import React, { useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useZoomPan } from "../../hooks/useZoomPan";
import { DragPlaceholder, CanvasView } from "..";
import { CanvasElement } from "../../types/types";

const CanvasArea: React.FC = () => {
  const [isSplitView, setIsSplitView] = useState(false);
  const [secondaryCanvasId, setSecondaryCanvasId] = useState<string | null>(
    null
  );
  const { dragData, dragPosition } = useDragAndDrop();
  const [splitRatio, setSplitRatio] = useState(0.5);
  const resizeRef = useRef<{ startX: number; startRatio: number } | null>(null);

  const primaryCanvas = useZoomPan();
  const secondaryCanvas = useZoomPan();

  const handleRightClick = (e: React.MouseEvent, elementId?: string) => {
    e.preventDefault();

    if (!elementId) return;

    const element = activeCanvas?.elements.find((el) => el.id === elementId);
    if (!element) return;

    const x = element.position.x;
    const y = element.position.y + 100;

    setContextMenu({
      x: x * primaryCanvas.zoomLevel + primaryCanvas.offset.x,
      y: y * primaryCanvas.zoomLevel + primaryCanvas.offset.y,
      elementId,
    });
  };

  const handleContextMenuAction = (action: string) => {
    if (!contextMenu?.elementId || !activeCanvas) return;

    switch (action) {
      case "delete":
        setCanvases((prev) =>
          prev.map((canvas) =>
            canvas.id === activeCanvasId
              ? {
                  ...canvas,
                  elements: canvas.elements.filter(
                    (el) => el.id !== contextMenu.elementId
                  ),
                }
              : canvas
          )
        );
        if (selectedElement?.element.id === contextMenu.elementId) {
          setSelectedElement(null);
        }
        break;

      case "duplicate":
        const elementToDuplicate = activeCanvas.elements.find(
          (el) => el.id === contextMenu.elementId
        );
        if (elementToDuplicate) {
          const newElement = {
            ...elementToDuplicate,
            id: `el-${Date.now()}`,
            position: {
              x: elementToDuplicate.position.x + 20,
              y: elementToDuplicate.position.y + 20,
            },
          };
          setCanvases((prev) =>
            prev.map((canvas) =>
              canvas.id === activeCanvasId
                ? { ...canvas, elements: [...canvas.elements, newElement] }
                : canvas
            )
          );
        }
        break;
    }
    setContextMenu(null);
  };

  const handleAddCanvas = () => {
    const newCanvas = {
      id: `canvas${canvases.length + 1}`,
      title: `Canvas ${canvases.length + 1}`,
      elements: [],
    };
    setCanvases([...canvases, newCanvas]);
    setActiveCanvasId(newCanvas.id);
  };

  const handleTabClose = (canvasId: string) => {
    if (canvases.length === 1) return;
    setCanvases(canvases.filter((canvas) => canvas.id !== canvasId));
    if (activeCanvasId === canvasId) {
      setActiveCanvasId(canvases[0].id);
    }
  };

  const handleElementClick = (el: CanvasElement) => {
    setSelectedElement({ canvasId: activeCanvasId, element: el });
  };

  const {
    getDragData,
    handleDragEnd,
    selectedElement,
    setSelectedElement,
    canvases,
    setCanvases,
    activeCanvasId,
    setActiveCanvasId,
  } = useAppContext();

  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
    elementId?: string;
  } | null>(null);

  const activeCanvas = canvases.find((canvas) => canvas.id === activeCanvasId);
  const secondaryCanvasData = canvases.find(
    (canvas) => canvas.id === secondaryCanvasId
  );

  const handleResizeStart = (e: React.MouseEvent) => {
    resizeRef.current = {
      startX: e.clientX,
      startRatio: splitRatio,
    };
    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizeRef.current) return;
    const delta = e.clientX - resizeRef.current.startX;
    const containerWidth = primaryCanvas.containerRef.current?.offsetWidth || 0;
    const newRatio = resizeRef.current.startRatio + delta / containerWidth;
    setSplitRatio(Math.max(0.2, Math.min(0.8, newRatio)));
  };

  const handleResizeEnd = () => {
    resizeRef.current = null;
    document.removeEventListener("mousemove", handleResizeMove);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  const handleDrop = (e: React.DragEvent, canvasId: string) => {
    e.preventDefault();
    const dragData = getDragData();

    if (!dragData) {
      const label = e.dataTransfer.getData("text/plain");
      if (label) {
        addElement(label, e, canvasId);
      }
    } else if (dragData.type === "element") {
      addElement(dragData.label, e, canvasId);
    }

    handleDragEnd();
  };

  const addElement = (label: string, e: React.DragEvent, canvasId: string) => {
    const containerRef =
      canvasId === activeCanvasId
        ? primaryCanvas.containerRef
        : secondaryCanvas.containerRef;
    const zoomLevel =
      canvasId === activeCanvasId
        ? primaryCanvas.zoomLevel
        : secondaryCanvas.zoomLevel;
    const offset =
      canvasId === activeCanvasId
        ? primaryCanvas.offset
        : secondaryCanvas.offset;

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - offset.x) / zoomLevel;
      const y = (e.clientY - rect.top - offset.y) / zoomLevel;
      const newElement: CanvasElement = {
        id: `el-${Date.now()}`,
        label,
        position: { x, y },
      };
      setCanvases((prev) =>
        prev.map((canvas) =>
          canvas.id === canvasId
            ? { ...canvas, elements: [...canvas.elements, newElement] }
            : canvas
        )
      );
    }
  };

  return (
    <div
      className="flex-1 flex flex-col relative bg-gray-100"
      onContextMenu={(e) => e.preventDefault()}
    >
      {dragData && (
        <DragPlaceholder position={dragPosition} elementType={dragData.type} />
      )}
      {/* Tab Bar */}
      <div className="flex space-x-2 bg-gray-200 p-2 border-b border-gray-300 z-10">
        <button
          onClick={() => setIsSplitView(!isSplitView)}
          className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
        >
          {isSplitView ? "Merge Views" : "Split View"}
        </button>
        {canvases.map((canvas) => (
          <div key={canvas.id} className="flex items-center">
            <button
              onClick={() => setActiveCanvasId(canvas.id)}
              className={`px-4 py-2 rounded-r-none ${
                canvas.id === activeCanvasId
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {canvas.title}
            </button>
            <button
              onClick={() => handleTabClose(canvas.id)}
              className="px-2 py-2 bg-gray-300 rounded-l-none hover:bg-red-500 text-white"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          onClick={handleAddCanvas}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          + Add Canvas
        </button>
      </div>
      <div className={`flex-1 flex ${isSplitView ? "flex-row" : "flex-col"}`}>
        <div
          style={{ width: isSplitView ? `${splitRatio * 100}%` : "100%" }}
          className="h-full flex flex-col"
        >
          <CanvasView
            {...primaryCanvas}
            canvas={activeCanvas}
            selectedElement={selectedElement}
            onDrop={(e) => handleDrop(e, activeCanvasId)}
            onElementClick={handleElementClick}
            onContextMenu={handleRightClick}
          />
        </div>
        {isSplitView && (
          <div
            className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize"
            onMouseDown={handleResizeStart}
          />
        )}
        {isSplitView && (
          <div
            style={{ width: `${(1 - splitRatio) * 100}%` }}
            className="h-full flex flex-col"
          >
            <div className="flex space-x-2 bg-gray-200 p-2 border-b border-gray-300">
              {canvases
                .filter((canvas) => canvas.id !== activeCanvasId)
                .map((canvas) => (
                  <button
                    key={canvas.id}
                    onClick={() => setSecondaryCanvasId(canvas.id)}
                    className={`px-4 py-2 rounded ${
                      canvas.id === secondaryCanvasId
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {canvas.title}
                  </button>
                ))}
            </div>
            <CanvasView
              {...secondaryCanvas}
              canvas={secondaryCanvasData}
              selectedElement={selectedElement}
              onDrop={(e) => handleDrop(e, secondaryCanvasId!)}
              onElementClick={handleElementClick}
              onContextMenu={handleRightClick}
            />
          </div>
        )}
        {contextMenu && (
          <div
            className="absolute bg-white shadow-lg rounded border divide-y divide-gray-100 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => handleContextMenuAction("duplicate")}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Duplicate
            </button>
            <button
              onClick={() => handleContextMenuAction("delete")}
              className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasArea;
