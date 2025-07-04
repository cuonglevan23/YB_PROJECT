import { memo, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineStar,
  AiOutlineBulb,
  AiOutlineEye,
  AiOutlineBarChart,
  AiOutlineVideoCamera,
  AiOutlineDesktop,
  AiOutlineLineChart,
  AiOutlineGift,
} from "react-icons/ai";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal = memo(function CheckoutModal({
  isOpen,
  onClose,
}: CheckoutModalProps) {
  const [cardInput, setCardInput] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("12months");

  if (!isOpen) return null;

  const features = [
    {
      icon: AiOutlineBulb,
      title: "Unlimited video ideas",
      color: "text-yellow-400",
    },
    {
      icon: AiOutlineEye,
      title: "Unlimited thumbnail generation",
      color: "text-blue-400",
    },
    {
      icon: AiOutlineBarChart,
      title: "Unlimited keyword research",
      color: "text-green-400",
    },
    {
      icon: AiOutlineVideoCamera,
      title: "Unlimited video optimizations",
      color: "text-purple-400",
    },
    {
      icon: AiOutlineDesktop,
      title: "Full access to the browser extension",
      color: "text-red-400",
    },
    {
      icon: AiOutlineLineChart,
      title: "Unlimited subscriber insights",
      color: "text-indigo-400",
    },
    {
      icon: AiOutlineGift,
      title: "Plus all premium features",
      color: "text-pink-400",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      {/* Large modal with split layout like in sample */}
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Features */}
          <div className="flex-1 p-8 lg:p-12 bg-slate-800">
            {/* Reviews Section with Laurel Decorations */}
            <div className="text-center mb-10">
              <div className="flex justify-center items-center mb-8 relative">
                {/* Laurel decorations */}
                <div className="absolute left-0 text-yellow-400 text-2xl">
                  🏆
                </div>
                <div className="flex items-center bg-slate-700/50 rounded-full px-6 py-3 mx-8">
                  <div className="flex space-x-1 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <AiOutlineStar
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-white text-sm font-medium">
                    20k+ 5 Star Reviews
                  </span>
                </div>
                <div className="absolute right-0 text-yellow-400 text-2xl">
                  🏆
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-slate-700/50 rounded-2xl p-6 mb-12">
                <blockquote className="text-white text-sm mb-4 leading-relaxed">
                  "vidIQ helps me in many ways. One is their Video Boost which
                  finds the most relevant keywords and tags."
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                    <span className="text-white text-sm font-bold">CW</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white text-sm font-medium">
                      Chad Wild Clay
                    </div>
                    <div className="text-gray-400 text-xs">
                      14.7M Subscribers
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="text-center">
              <h2 className="text-white text-3xl font-bold mb-2">
                Unlock everything you need to
              </h2>
              <h3 className="text-white text-3xl font-bold mb-10">
                grow <span className="text-blue-400">2x faster</span>
              </h3>

              <div className="space-y-4 text-left max-w-sm mx-auto">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon
                        className={`w-5 h-5 ${feature.color} flex-shrink-0`}
                      />
                      <span className="text-white text-sm">
                        {feature.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Checkout */}
          <div className="w-full lg:w-96 bg-slate-700 p-8">
            <div className="pt-4">
              <h3 className="text-white text-2xl font-bold mb-8 text-center">
                Checkout
              </h3>

              {/* Pricing Options - Side by Side */}
              <div className="flex space-x-3 mb-6">
                {/* 12 months option */}
                <div
                  className={`flex-1 rounded-xl p-4 cursor-pointer transition-all border-2 ${
                    selectedPlan === "12months"
                      ? "bg-blue-600 border-blue-500"
                      : "bg-slate-600 border-slate-500 hover:border-slate-400"
                  }`}
                  onClick={() => setSelectedPlan("12months")}
                >
                  <div className="text-center">
                    <div className="text-white font-medium text-sm mb-1">
                      12 months
                    </div>
                    <div className="text-white">
                      <span className="text-lg font-bold">$17</span>
                      <span className="text-xs">/month</span>
                    </div>
                  </div>
                </div>

                {/* 1 month option */}
                <div
                  className={`flex-1 rounded-xl p-4 cursor-pointer transition-all border-2 ${
                    selectedPlan === "1month"
                      ? "bg-blue-600 border-blue-500"
                      : "bg-slate-600 border-slate-500 hover:border-slate-400"
                  }`}
                  onClick={() => setSelectedPlan("1month")}
                >
                  <div className="text-center">
                    <div className="text-white font-medium text-sm mb-1">
                      1 month
                    </div>
                    <div className="text-white">
                      <span className="text-lg font-bold">$19</span>
                      <span className="text-xs">/month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Details */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm">
                    Boost (1 channel) - {selectedPlan === "1month" ? "1" : "12"}{" "}
                    month{selectedPlan === "12months" ? "s" : ""}
                  </span>
                  <span className="text-white text-sm">$199/year</span>
                </div>
                <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                  Add Promo Code
                </button>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold text-lg">
                    Amount Due Today
                  </span>
                  <span className="text-white font-bold text-lg">$199</span>
                </div>
                <div className="text-gray-400 text-xs">
                  <div>Billed $199/year until cancelled.</div>
                  <div>Renews July 4, 2026.</div>
                </div>
              </div>

              {/* Payment Form - Single Input with proper spacing */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Số thẻ                    MM / YY   CVC"
                    value={cardInput}
                    onChange={(e) => setCardInput(e.target.value)}
                    className="w-full bg-slate-600 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Pay Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors text-base mb-4">
                Pay Now
              </button>

              {/* Terms */}
              <div className="text-gray-400 text-xs leading-relaxed">
                Service begins as soon as your initial payment is processed. All
                purchases are final. Your subscription automatically renews,
                unless cancelled at least 24 hours prior to the end of your
                current term. Cancel at any time in Account Settings at no
                additional cost; your subscription will cease at the end of the
                current term.
                <br />
                <button className="text-blue-400 hover:text-blue-300 underline mt-2 inline-block">
                  Terms & Conditions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CheckoutModal;
