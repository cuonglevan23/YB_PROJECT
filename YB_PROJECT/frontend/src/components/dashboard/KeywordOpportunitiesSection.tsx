import { memo } from "react";
import { AiOutlineLineChart, AiOutlineLock } from "react-icons/ai";
import { Card, Button } from "../ui";

const KeywordOpportunitiesSection = memo(
  function KeywordOpportunitiesSection() {
    const keywords = [
      {
        keyword: "live stream",
        searchVolume: "284,121",
        competition: "High",
        overall: 62,
      },
      {
        keyword: "become a better goalkeeper",
        searchVolume: "1,402",
        competition: "Very low",
        overall: 61,
      },
      {
        keyword: "toyota technology",
        searchVolume: "1,377",
        competition: "Medium",
        overall: 52,
      },
    ];

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Top Keyword Opportunities
          </h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm">
            Manage
          </button>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    <input type="checkbox" className="mr-3" />
                    Keyword
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    Search volume ⬇
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    Competition ⬇
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium py-3">
                    Overall ⬇
                  </th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800/50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-white text-sm">
                          {item.keyword}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-300 text-sm">
                        {item.searchVolume}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-300 text-sm">
                        {item.competition}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            item.overall >= 60
                              ? "bg-green-500"
                              : item.overall >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.overall}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <AiOutlineLineChart className="text-white" />
                </div>
                <span className="text-white">
                  Get more top keyword opportunities for your channel
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
              >
                <AiOutlineLock className="mr-1" />
                Unlock With Boost
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
);

export default KeywordOpportunitiesSection;
