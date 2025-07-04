import { memo } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Card } from "../ui";

const SearchKeywordSection = memo(function SearchKeywordSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Search a Keyword
      </h2>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search keywords"
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

export default SearchKeywordSection;
