import { memo } from "react";
import {
  AiOutlineSearch,
  AiOutlineEye,
  AiOutlineFileText,
  AiOutlineTeam,
  AiOutlineEdit,
  AiOutlineSetting,
  AiOutlineBulb,
  AiOutlineStar,
  AiOutlinePicture,
  AiOutlineTool,
  AiOutlineLink,
  AiOutlineMessage,
  AiOutlineBook,
} from "react-icons/ai";

const ToolsGrid = memo(function ToolsGrid() {
  const tools = [
    { icon: AiOutlineSearch, label: "Keywords" },
    { icon: AiOutlineEye, label: "Competitors" },
    { icon: AiOutlineFileText, label: "Outliers" },
    { icon: AiOutlineTeam, label: "Subscribers" },
    { icon: AiOutlineEdit, label: "Script Writer" },
    { icon: AiOutlineSetting, label: "Generate" },
    { icon: AiOutlineBulb, label: "Daily Ideas" },
    { icon: AiOutlineStar, label: "Create" },
    { icon: AiOutlinePicture, label: "Thumbnail" },
    { icon: AiOutlineTool, label: "Optimize" },
    { icon: AiOutlineLink, label: "SEO" },
    { icon: AiOutlineMessage, label: "Coach" },
    { icon: AiOutlineBook, label: "Learn" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Tools</h2>
      <div className="grid grid-cols-3 gap-4">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={index}
              className="aspect-square bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center"
            >
              <IconComponent className="text-2xl mb-1 text-gray-300" />
              <span className="text-xs text-gray-300 text-center">
                {tool.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ToolsGrid;
