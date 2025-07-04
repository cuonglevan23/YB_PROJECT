import React from "react";
import { Link } from "react-router-dom";
import { GoogleButton, Button } from "../ui/buttons";
import { Input } from "../ui/inputs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface FormField {
  name: string;
  type: "email" | "password" | "text";
  placeholder: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

interface AuthFormProps {
  title: string;
  subtitle?: string;
  fields: FormField[];
  submitButtonText: string;
  submitButtonLoadingText?: string;
  showGoogleAuth?: boolean;
  googleButtonText?: string;
  formData: Record<string, string>;
  showPassword?: boolean;
  loading?: boolean;
  error?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkTo?: string;
  additionalLinks?: React.ReactNode;
  onInputChange: (name: string, value: string) => void;
  onPasswordToggle?: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleAuth?: () => void;
  privacyText?: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  fields,
  submitButtonText,
  submitButtonLoadingText,
  showGoogleAuth = true,
  googleButtonText = "Sign in with Google",
  formData,
  showPassword = false,
  loading = false,
  error,
  footerText,
  footerLinkText,
  footerLinkTo,
  additionalLinks,
  onInputChange,
  onPasswordToggle,
  onSubmit,
  onGoogleAuth,
  privacyText,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      </div>

      {/* Google Auth Button */}
      {showGoogleAuth && onGoogleAuth && (
        <GoogleButton
          onClick={onGoogleAuth}
          className="w-full"
          disabled={loading}
        >
          {googleButtonText}
        </GoogleButton>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form Fields */}
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            <div className="relative">
              <Input
                type={
                  field.type === "password" && showPassword
                    ? "text"
                    : field.type
                }
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) => onInputChange(field.name, e.target.value)}
                required={field.required}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {field.showPasswordToggle && onPasswordToggle && (
                <button
                  type="button"
                  onClick={onPasswordToggle}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? submitButtonLoadingText || "Loading..." : submitButtonText}
        </Button>
      </form>

      {/* Privacy Text */}
      {privacyText && (
        <div className="text-xs text-gray-400 text-center">{privacyText}</div>
      )}

      {/* Additional Links */}
      {additionalLinks}

      {/* Footer */}
      {footerText && footerLinkText && footerLinkTo && (
        <div className="text-center text-sm text-gray-400">
          {footerText}{" "}
          <Link
            to={footerLinkTo}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            {footerLinkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
