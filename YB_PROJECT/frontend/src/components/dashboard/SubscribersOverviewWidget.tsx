import { memo } from "react";
import { AiOutlineLineChart, AiOutlineLock } from "react-icons/ai";
import { Card, Button } from "../ui";

const SubscribersOverviewWidget = memo(function SubscribersOverviewWidget() {
  const widgets = [
    {
      title: "Want to see your best time to publish?",
      buttonText: "Unlock With Boost",
    },
    {
      title:
        "Get access to top videos and top channels watched by your subscribers",
      buttonText: "Unlock With Boost",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Subscribers Overview
      </h2>
      <div className="space-y-4">
        {widgets.map((widget, index) => (
          <Card
            key={index}
            className="p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AiOutlineLineChart className="text-white" />
              </div>
              <p className="text-white text-sm mb-4">{widget.title}</p>
              <Button
                variant="outline"
                size="sm"
                className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
              >
                <AiOutlineLock className="mr-1" />
                {widget.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
});

export default SubscribersOverviewWidget;
