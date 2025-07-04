import { memo } from "react";

const DailyIdeasGenerator = memo(function DailyIdeasGenerator() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-xl font-bold mb-4">
        Daily Ideas Generator
      </h2>
      <p className="text-gray-400 mb-4">
        Get fresh video ideas tailored to your channel
      </p>
      <div className="space-y-4">
        <div className="bg-gray-700 rounded p-4">
          <h3 className="text-white font-medium mb-2">Your Channel Topic</h3>
          <input
            type="text"
            placeholder="e.g., Tech Reviews, Gaming, Cooking..."
            className="w-full bg-gray-600 text-white p-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Generate Ideas
        </button>
      </div>
    </div>
  );
});

export default DailyIdeasGenerator;
