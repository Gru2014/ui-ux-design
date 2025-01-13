import { CanvasElement } from "../../types/types";

interface GroupedElementsProps {
  elements: CanvasElement[];
  position: { x: number; y: number };
  onExpand: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

const GroupedElements: React.FC<GroupedElementsProps> = ({
  elements,
  position,
  onExpand,
  onContextMenu,
}) => {
  return (
    <div
      className="absolute p-2 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        top: position.y,
        left: position.x,
      }}
      onDoubleClick={onExpand}
      onContextMenu={onContextMenu}
    >
      <div className="flex items-center space-x-2">
        <div className="text-xl">📦</div>
        <span className="text-sm font-medium">{elements.length} items</span>
      </div>
    </div>
  );
};

export default GroupedElements;
