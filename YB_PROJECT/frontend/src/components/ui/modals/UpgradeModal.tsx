import { memo, useState } from "react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal = memo(function UpgradeModal({
  isOpen,
  onClose,
}: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("1month");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Features */}
          <div>
            {/* Reviews */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-300 text-lg font-medium">
                    20k+ 5 Star Reviews
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h8.18l.42-8.5C20.6 7.9 16.85 2 12 2zM12 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h8.18l.42-8.5C20.6 7.9 16.85 2 12 2zM12 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700">
              <p className="text-gray-300 mb-4 italic">
                "We use vidIQ every day to manage keywords, audit video
                performance, and research what's winning in our niche."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SC</span>
                </div>
                <div>
                  <div className="text-white font-medium">Sean Cannell</div>
                  <div className="text-gray-400 text-sm">2.7M Subscribers</div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-white text-2xl font-bold mb-6">
                Unlock everything you need to
                <br />
                grow <span className="text-blue-400">2x faster</span>
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ),
                    text: "Unlimited video ideas",
                  },
                  {
                    icon: (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    ),
                    text: "Unlimited thumbnail generation",
                  },
                  {
                    icon: (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    ),
                    text: "Unlimited keyword research",
                  },
                  {
                    icon: (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                      </svg>
                    ),
                    text: "Unlimited video optimizations",
                  },
                  {
                    icon: (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    ),
                    text: "Full access to the browser extension",
                  },
                  {
                    icon: (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V18h2v-7.5c0-.83.67-1.5 1.5-1.5S17 9.67 17 10.5V18h2v-7.5c0-1.93-1.57-3.5-3.5-3.5S12 8.57 12 10.5v1h-1.5c-1.93 0-3.5 1.57-3.5 3.5V18H4z" />
                      </svg>
                    ),
                    text: "Unlimited subscriber insights",
                  },
                  {
                    icon: (
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ),
                    text: "Plus all premium features",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.icon}
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Checkout */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Checkout</h2>

            {/* Plan Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setSelectedPlan("12months")}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  selectedPlan === "12months"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50"
                }`}
              >
                <div className="absolute -top-2 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Save $29
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">12 months</div>
                  <div className="text-2xl font-bold text-white">
                    $17
                    <span className="text-sm font-normal text-gray-400">
                      /month
                    </span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedPlan("1month")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPlan === "1month"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50"
                }`}
              >
                <div className="text-center">
                  <div className="text-white font-medium">1 month</div>
                  <div className="text-2xl font-bold text-white">
                    $19
                    <span className="text-sm font-normal text-gray-400">
                      /month
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Boost Option */}
            <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <span className="text-white">Boost (1 channel) - 1 month</span>
              <span className="text-white font-medium">$19/month</span>
            </div>

            {/* Promo Code */}
            <button className="text-blue-400 text-sm mb-6 hover:text-blue-300 transition-colors">
              Add Promo Code
            </button>

            {/* Amount Due */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-lg font-medium">
                  Amount Due Today
                </span>
                <span className="text-white text-2xl font-bold">$19</span>
              </div>
              <div className="text-gray-400 text-sm">
                Billed $19/month until canceled.
                <br />
                Renews August 4, 2025.
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Số thẻ"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center gap-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 2v2H4V6h16zm0 6H4v6h16v-6z" />
                  </svg>
                  <span className="text-xs font-medium">MM / YY CVC</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Pay Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl mt-6 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              Pay Now
            </button>

            {/* Terms */}
            <div className="text-gray-400 text-xs mt-4 leading-relaxed">
              Service begins as soon as your initial payment is processed. All
              purchases are final. Your subscription automatically renews,
              unless cancelled at least 24 hours prior to the end of your
              current term. Cancel at any time in Account Settings at no
              additional cost; your subscription will cease at the end of the
              current term.{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UpgradeModal;
