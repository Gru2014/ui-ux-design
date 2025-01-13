import {
  FaPlus,
  FaMinus,
  FaTimes,
  FaDivide,
  FaFont,
  FaHashtag,
  FaCalendar,
  FaChartBar,
  FaTable,
  FaBell,
} from "react-icons/fa";
export const categories = [
    {
      title: "Operators",
      elements: [
        { id: "add", label: "Add", icon: <FaPlus className="text-green-500" />, description: "Add two values" },
        {
          id: "subtract",
          label: "Subtract",
          icon: <FaMinus className="text-red-500" />,
          description: "Subtract two values",
        },
        {
          id: "multiply",
          label: "Multiply",
          icon: <FaTimes className="text-blue-500" />,
          description: "Multiply two values",
        },
        {
          id: "divide",
          label: "Divide",
          icon: <FaDivide className="text-purple-500" />,
          description: "Divide two values",
        },
      ],
    },
    {
      title: "Inputs",
      elements: [
        { id: "text", label: "Text", icon: <FaFont className="text-gray-600" />, description: "Text input field" },
        {
          id: "number",
          label: "Number",
          icon: <FaHashtag className="text-indigo-500" />,
          description: "Numeric input",
        },
        { id: "date", label: "Date", icon: <FaCalendar className="text-orange-500" />, description: "Date picker" },
      ],
    },
    {
      title: "Outputs",
      elements: [
        {
          id: "graph",
          label: "Graph",
          icon: <FaChartBar className="text-blue-600" />,
          description: "Data visualization",
        },
        {
          id: "table",
          label: "Table",
          icon: <FaTable className="text-teal-500" />,
          description: "Tabular data display",
        },
        {
          id: "alert",
          label: "Alert",
          icon: <FaBell className="text-yellow-500" />,
          description: "Notification alert",
        },
      ],
    },
  ];