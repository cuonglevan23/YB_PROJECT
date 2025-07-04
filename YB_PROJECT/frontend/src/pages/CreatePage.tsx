import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AiOutlineBulb,
  AiOutlineFileText,
  AiOutlinePlus,
  AiOutlineEdit,
} from "react-icons/ai";
import { MdOutlineImage } from "react-icons/md";
import ThumbnailGenerator from "../components/create/ThumbnailGenerator";

interface CreateTool {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isAvailable: boolean;
}

const CreatePage = memo(function CreatePage() {
  const location = useLocation();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Check URL params for pre-selected tool
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const toolParam = urlParams.get("tool");
    if (toolParam) {
      setSelectedTool(toolParam);
    }
  }, [location.search]);

  const createTools: CreateTool[] = [
    {
      id: "thumbnails",
      title: "Thumbnails",
      description: "Create eye-catching thumbnails for your videos",
      icon: MdOutlineImage,
      isAvailable: true,
    },
    {
      id: "daily-ideas",
      title: "Daily Ideas",
      description: "Get personalized video title ideas for your channel",
      icon: AiOutlineBulb,
      isAvailable: true,
    },
    {
      id: "script-writer",
      title: "Script Writer",
      description: "Write engaging scripts tailored to your channel",
      icon: AiOutlineFileText,
      isAvailable: true,
    },
    {
      id: "generate",
      title: "Generate",
      description: "Generate titles, outlines, and descriptions",
      icon: AiOutlinePlus,
      isAvailable: true,
    },
    {
      id: "create",
      title: "Create",
      description: "Make new content from your ideas",
      icon: AiOutlineEdit,
      isAvailable: true,
    },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    console.log("Selected tool:", toolId);
    // Update URL to reflect selected tool
    const newUrl = `/create?tool=${toolId}`;
    window.history.pushState({}, "", newUrl);
  };

  // Render specific tool component
  const renderSelectedTool = () => {
    switch (selectedTool) {
      case "thumbnails":
        return <ThumbnailGenerator />;
      case "daily-ideas":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Daily Ideas Generator
            </h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        );
      case "script-writer":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Script Writer
            </h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        );
      case "generate":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Content Generator
            </h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        );
      case "create":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Content Creator
            </h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  // If a tool is selected, show only that tool
  if (selectedTool) {
    return (
      <div>
        {/* Back button */}
        <div className="p-6 border-b border-gray-700">
          <button
            onClick={() => {
              setSelectedTool(null);
              window.history.pushState({}, "", "/create");
            }}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Create Tools
          </button>
        </div>
        {renderSelectedTool()}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create</h1>
        <p className="text-gray-400">
          Choose from our powerful creation tools to make amazing content
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {createTools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool.id)}
              disabled={!tool.isAvailable}
              className={`
                group relative p-6 rounded-xl border transition-all duration-200 text-left
                ${
                  isSelected
                    ? "bg-blue-600/20 border-blue-500"
                    : tool.isAvailable
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-700"
                    : "bg-gray-800/50 border-gray-700/50 cursor-not-allowed opacity-50"
                }
              `}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg mb-4 group-hover:bg-gray-600 transition-colors">
                <Icon
                  className={`w-6 h-6 ${
                    isSelected ? "text-blue-400" : "text-gray-300"
                  }`}
                />
              </div>

              {/* Content */}
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isSelected ? "text-blue-400" : "text-white"
                }`}
              >
                {tool.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {tool.description}
              </p>

              {/* Status Badge */}
              {!tool.isAvailable && (
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Tool Details */}
      {selectedTool && (
        <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            Get Started with{" "}
            {createTools.find((t) => t.id === selectedTool)?.title}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Start Creating
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CreatePage;
