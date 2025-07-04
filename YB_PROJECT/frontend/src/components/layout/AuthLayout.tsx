import React from "react";
import { Logo } from "../ui/brand";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Testimonial section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          {/* Logo */}
          <div className="absolute top-8 left-8">
            <Logo className="text-white" />
          </div>

          {/* Testimonial content */}
          <div className="max-w-lg">
            <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-8">
              "We use vidIQ every day to manage keywords, audit video
              performance, and research what's winning in our niche."
            </blockquote>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src="/api/placeholder/48/48"
                  alt="Sean Cannell"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">Sean Cannell</div>
                <div className="text-blue-200 text-sm">2.7M subs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 bg-slate-800 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Logo className="text-white" />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
