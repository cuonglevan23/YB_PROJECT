import { memo, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

const ForgotPassword = memo(function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Add your password reset logic here
      console.log("Password reset attempt:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch {
      setError("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "email",
      type: "email" as const,
      placeholder: "Enter your email...",
      required: true,
    },
  ];

  if (success) {
    return (
      <AuthLayout>
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white">
            Check your email
          </h1>
          <p className="text-gray-400">
            We've sent a password reset link to{" "}
            <span className="text-white">{formData.email}</span>
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Didn't receive the email? Try again
          </button>
          <div className="pt-4">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-sm"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthForm
        title="Forgot your password?"
        fields={fields}
        submitButtonText="Request reset"
        submitButtonLoadingText="Sending..."
        showGoogleAuth={false}
        formData={formData}
        loading={loading}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        additionalLinks={
          <div className="text-center">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-sm"
            >
              ← Back to login
            </Link>
          </div>
        }
      />
    </AuthLayout>
  );
});

export default ForgotPassword;
