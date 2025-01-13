import React, { DragEvent, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useAppContext } from "../../contexts/AppContext";
import { Element } from "../../types/types";
import { categories } from "../../utils/utils";
import { Input, Button } from "..";

const Container: React.FC = () => {
  const { handleDragStart, handleDragEnd } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const filteredCategories = categories
    .map((category) => ({
      title: category.title,
      elements: category.elements.filter(
        (el) =>
          el.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          el.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.elements.length > 0);

  const onDragStart = (e: DragEvent, element: Element) => {
    handleDragStart({ type: "element", label: element.label });
    e.dataTransfer.setData("text/plain", element.label);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-full sm:w-64 bg-white border-r border-gray-300 overflow-auto z-10">
      <div className="p-2 sm:p-4 sticky top-0 bg-white z-10 shadow-sm">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search elements..."
          className="w-full text-sm sm:text-base"
        />
      </div>
      <div className="p-4 overflow-y-auto scroll-smooth">
        {filteredCategories.map((category, idx) => (
          <div key={idx} className="mb-6">
            <Button handleClick={() => toggleSection(category.title)}>
              <span>{category.title}</span>
              {collapsedSections.includes(category.title) ? (
                <FaChevronRight className="text-sm" />
              ) : (
                <FaChevronDown className="text-sm" />
              )}
            </Button>
            <ul
              className={`space-y-2 transition-all duration-300 ease-in-out ${
                collapsedSections.includes(category.title)
                  ? "h-0 opacity-0"
                  : "h-auto opacity-100"
              }`}
            >
              {category.elements.map((element, idx2) => (
                <li
                  key={idx2}
                  draggable
                  onDragStart={(e) => onDragStart(e, element)}
                  onDragEnd={handleDragEnd}
                  className="cursor-pointer p-2 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group relative touch-manipulation"
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-lg transform group-hover:scale-110 transition-transform">
                      {element.icon}
                    </div>
                    <div className="transition-all duration-300">
                      <div className="font-medium group-hover:text-blue-600">
                        {element.label}
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-700 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
                        {element.description}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
                </li>
              ))}
            </ul>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No elements found
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
