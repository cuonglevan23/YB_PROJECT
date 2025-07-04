import { memo } from "react";
import {
  AiOutlineSearch,
  AiOutlineEye,
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineBulb,
  AiOutlinePicture,
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlineCreate } from "react-icons/md";
import type { ComponentType } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  category: string;
}

const ToolsDropdown = memo(function ToolsDropdown() {
  const tools: Tool[] = [
    {
      id: "1",
      name: "Keywords",
      description: "Find trending keywords",
      icon: AiOutlineSearch,
      category: "Research",
    },
    {
      id: "2",
      name: "Competitors",
      description: "Analyze competition",
      icon: AiOutlineEye,
      category: "Research",
    },
    {
      id: "3",
      name: "Outliers",
      description: "Discover opportunities",
      icon: AiOutlineBarChart,
      category: "Research",
    },
    {
      id: "4",
      name: "Subscribers",
      description: "Grow your audience",
      icon: AiOutlineUser,
      category: "Growth",
    },
    {
      id: "5",
      name: "Script Writer",
      description: "Generate scripts",
      icon: AiOutlineFileText,
      category: "Content",
    },
    {
      id: "6",
      name: "Generate",
      description: "Create content ideas",
      icon: AiOutlineBulb,
      category: "Content",
    },
    {
      id: "7",
      name: "Daily Ideas",
      description: "Get daily inspiration",
      icon: AiOutlineBulb,
      category: "Content",
    },
    {
      id: "8",
      name: "Create",
      description: "Design thumbnails",
      icon: MdOutlineCreate,
      category: "Design",
    },
    {
      id: "9",
      name: "Thumbnail",
      description: "Optimize visuals",
      icon: AiOutlinePicture,
      category: "Design",
    },
    {
      id: "10",
      name: "Optimize",
      description: "Improve performance",
      icon: BiTrendingUp,
      category: "Optimization",
    },
    {
      id: "11",
      name: "SEO",
      description: "Boost discoverability",
      icon: AiOutlineBarChart,
      category: "Optimization",
    },
    {
      id: "12",
      name: "Coach",
      description: "Get expert guidance",
      icon: AiOutlineUser,
      category: "Learning",
    },
  ];

  return (
    <div className="w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      {/* Tools Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {tools.slice(0, 12).map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gray-600">
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
                <span className="text-gray-300 text-xs font-medium text-center leading-tight group-hover:text-white">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default ToolsDropdown;
