import { memo } from "react";

const ThumbnailGenerator = memo(function ThumbnailGenerator() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-xl font-bold mb-4">Thumbnail Generator</h2>
      <p className="text-gray-400 mb-4">
        Create eye-catching thumbnails for your videos
      </p>
      <div className="space-y-4">
        <div className="bg-gray-700 rounded p-4">
          <h3 className="text-white font-medium mb-2">Upload Image</h3>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <p className="text-gray-400">Drag and drop or click to upload</p>
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Generate Thumbnail
        </button>
      </div>
    </div>
  );
});

export default ThumbnailGenerator;
