import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppContext } from "../../contexts/AppContext";
import { Input } from "..";

const PropertiesPanel: React.FC = () => {
  const { selectedElement, updateSelectedElement, updateUserEditing } =
    useAppContext();
  const [label, setLabel] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(60);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedElement) {
      setLabel(selectedElement.element.label);
      setX(selectedElement.element.position.x);
      setY(selectedElement.element.position.y);
      setWidth(selectedElement.element.width || 100);
      setHeight(selectedElement.element.height || 60);
      updateUserEditing(selectedElement.element.id);
    } else {
      resetForm();
      return () => updateUserEditing(undefined);
    }
  }, [selectedElement]);

  const resetForm = () => {
    setLabel("");
    setX(0);
    setY(0);
    setWidth(100);
    setHeight(60);
    setErrors({});
  };

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };

    switch (name) {
      case "label":
        if (!value.trim()) {
          newErrors.label = "Label is required";
        } else {
          delete newErrors.label;
        }
        break;
      case "x":
      case "y":
      case "width":
      case "height":
        if (isNaN(value) || value < 0) {
          newErrors[name] = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must be a positive number`;
        } else {
          delete newErrors[name];
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = ["label", "x", "y", "width", "height"].every((field) =>
      validateField(field, eval(field))
    );

    if (isValid) {
      updateSelectedElement({
        label,
        position: { x, y },
        width,
        height,
      });
    }
  };

  return (
    <div className="w-72 bg-gray-50 border-l border-gray-300 p-4 z-10">
      <h2 className="font-bold mb-4">Properties</h2>
      {selectedElement ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Label</label>
              <Input
                type="text"
                value={label}
                placeholder="Enter label"
                onChange={(e) => {
                  setLabel(e.target.value);
                  validateField("label", e.target.value);
                }}
                errors={errors.label}
              />
            </div>

            <div>
              <label className="block mb-1">Position</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={x}
                  placeholder="Enter X"
                  onChange={(e) => {
                    setX(parseInt(e.target.value) || 0);
                    validateField("x", e.target.value);
                  }}
                  errors={errors.x}
                />
                <Input
                  type="number"
                  value={y}
                  placeholder="Enter Y"
                  onChange={(e) => {
                    setY(parseInt(e.target.value) || 0);
                    validateField("y", e.target.value);
                  }}
                  errors={errors.y}
                />
              </div>
            </div>

            <div
              className="cursor-pointer flex items-center"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? (
                <FaChevronLeft className="h-4 w-4 mr-1" />
              ) : (
                <FaChevronRight className="h-4 w-4 mr-1" />
              )}
              <span className="font-medium">Advanced Options</span>
            </div>

            {showAdvanced && (
              <div className="space-y-4 pl-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1">Width</label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => {
                        setWidth(parseInt(e.target.value) || 0);
                        validateField("width", e.target.value);
                      }}
                      placeholder="Enter width"
                      errors={errors.width}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Height</label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => {
                        setHeight(parseInt(e.target.value) || 0);
                        validateField("height", e.target.value);
                      }}
                      placeholder="Enter height"
                      errors={errors.height}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
            disabled={Object.keys(errors).length > 0}
          >
            Update
          </button>
        </form>
      ) : (
        <p className="text-gray-500">
          Select an element to edit its properties.
        </p>
      )}
    </div>
  );
};

export default PropertiesPanel;
