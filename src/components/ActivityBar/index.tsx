import React, { useState } from "react";
import { Tooltip } from "..";

const ActivityBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: "📂", tooltip: "Open File Explorer", label: "Files" },
    { icon: "💾", tooltip: "Save Current File", label: "Save" },
    { icon: "🔗", tooltip: "Connect to Server", label: "Connect" },
    { icon: "📜", tooltip: "Version Control", label: "Version Control" },
  ];

  return (
    <div
      className={`bg-gray-800 text-white flex flex-col p-2 md:p-4 transition-all duration-300 ${
        isExpanded ? "w-36 md:w-48" : "w-12 md:w-16"
      } fixed md:relative h-screen z-50`}
    >
      <Tooltip label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-4 md:mb-6 p-1.5 md:p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors"
        >
          <div className="space-y-1">
            <span
              className={`block w-4 md:w-5 h-0.5 bg-white transition-all duration-300 ${
                isExpanded ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-4 md:w-5 h-0.5 bg-white transition-all duration-300 ${
                isExpanded ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-4 md:w-5 h-0.5 bg-white transition-all duration-300 ${
                isExpanded ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>
      </Tooltip>

      {actions.map((action, idx) => (
        <Tooltip key={idx} label={action.tooltip}>
          <div className="mb-3 md:mb-4 p-1 hover:bg-gray-700 rounded cursor-pointer w-full flex items-center justify-start transition-colors hover:text-primary-light">
            <span className="text-lg md:text-xl">{action.icon}</span>
            {isExpanded && (
              <span className="ml-2 md:ml-3 text-xs md:text-sm truncate">
                {action.label}
              </span>
            )}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default ActivityBar;
