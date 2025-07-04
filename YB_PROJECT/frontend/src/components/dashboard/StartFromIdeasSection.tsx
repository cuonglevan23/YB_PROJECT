import { memo } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Card } from "../ui";

const StartFromIdeasSection = memo(function StartFromIdeasSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-2">
        Start From Your Ideas
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Get top-performing titles based on your channel and audience
      </p>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Describe your video idea in any way that feels natural to you..."
            className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 text-sm focus:outline-none"
          />
          <button className="text-gray-400 hover:text-white">
            <AiOutlineArrowRight />
          </button>
        </div>
      </Card>
    </div>
  );
});

export default StartFromIdeasSection;
