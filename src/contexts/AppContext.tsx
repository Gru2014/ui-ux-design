// src/contexts/AppContext.tsx

import React, { createContext, useContext, useState } from "react";
import { useDragAndDrop, DragData } from "../hooks/useDragAndDrop";
import { Canvas, CanvasElement, SelectedElement, User } from "../types/types";

interface AppContextProps {
  handleDragStart: (data: DragData) => void;
  handleDragEnd: () => void;
  getDragData: () => DragData | null;
  selectedElement: SelectedElement | null;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<SelectedElement | null>
  >;
  canvases: Canvas[];
  setCanvases: React.Dispatch<React.SetStateAction<Canvas[]>>;
  activeCanvasId: string;
  setActiveCanvasId: React.Dispatch<React.SetStateAction<string>>;
  updateSelectedElement: (updates: Partial<CanvasElement>) => void;
  users: User[];
  currentUser: User;
  updateUserPosition: (position: { x: number; y: number }) => void;
  updateUserEditing: (elementId: string | undefined) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleDragStart, handleDragEnd, getDragData } = useDragAndDrop();
  const [selectedElement, setSelectedElement] =
    useState<SelectedElement | null>(null);
  const [canvases, setCanvases] = useState<Canvas[]>([
    { id: "canvas1", title: "Canvas 1", elements: [] },
  ]);
  const [activeCanvasId, setActiveCanvasId] = useState("canvas1");

  const updateSelectedElement = (updates: Partial<CanvasElement>) => {
    if (selectedElement) {
      setCanvases((prev) =>
        prev.map((canvas) =>
          canvas.id === selectedElement.canvasId
            ? {
                ...canvas,
                elements: canvas.elements.map((el) =>
                  el.id === selectedElement.element.id
                    ? { ...el, ...updates }
                    : el
                ),
              }
            : canvas
        )
      );
      setSelectedElement((prev) =>
        prev ? { ...prev, element: { ...prev.element, ...updates } } : prev
      );
    }
  };

  const updateUserEditing = (elementId: string | undefined) => {
    // Implement the logic for updating user editing here
  };

  return (
    <AppContext.Provider
      value={{
        handleDragStart,
        handleDragEnd,
        getDragData,
        selectedElement,
        setSelectedElement,
        canvases,
        setCanvases,
        activeCanvasId,
        setActiveCanvasId,
        updateSelectedElement,
        updateUserEditing,
        users: [],
        currentUser: {
          id: "1",
          name: "User 1",
          color: "red",
          position: { x: 0, y: 0 },
          editingElementId: undefined,
        },
        updateUserPosition: () => {},
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
