import { memo } from "react";
import { Card } from "../ui";

const MonetizationWidget = memo(function MonetizationWidget() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Monetization</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <div className="text-white text-2xl font-bold mb-1">41/1000</div>
            <div className="text-gray-400 text-sm">Subscribers</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "4.1%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="text-white text-2xl font-bold mb-1">0.7/4000</div>
            <div className="text-gray-400 text-sm">Watch time (h)</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "0.0175%" }}
              ></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default MonetizationWidget;
