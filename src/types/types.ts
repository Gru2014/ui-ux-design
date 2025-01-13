export interface Element {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export interface User {
  id: string;
  name: string;
  color: string
  position: { x: number; y: number };
  editingElementId?:string
}

export interface CanvasElement {
  id: string;
  label: string;
  position: { x: number; y: number };
  height?: number;
  width?: number;
  lockedBy?:string
}

export interface Canvas {
  id: string;
  title: string;
  elements: CanvasElement[];
}

export interface SelectedElement {
  canvasId: string;
  element: CanvasElement;
}

export interface DragData {
  type: string;
  label: string;
}
