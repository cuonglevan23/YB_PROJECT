import { memo, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

const Login = memo(function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      // Add your login logic here
      console.log("Login attempt:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    console.log("Google auth clicked");
    // Add Google auth logic here
  };

  const fields = [
    {
      name: "email",
      type: "email" as const,
      placeholder: "Enter your email...",
      required: true,
    },
    {
      name: "password",
      type: "password" as const,
      placeholder: "Enter your password...",
      required: true,
      showPasswordToggle: true,
    },
  ];

  return (
    <AuthLayout>
      <AuthForm
        title="Log in to vidIQ"
        fields={fields}
        submitButtonText="Log in to your account"
        submitButtonLoadingText="Logging in..."
        googleButtonText="Log in with Google"
        formData={formData}
        showPassword={showPassword}
        loading={loading}
        error={error}
        footerText="Don't have an account?"
        footerLinkText="Sign up here"
        footerLinkTo="/signup"
        onInputChange={handleInputChange}
        onPasswordToggle={() => setShowPassword(!showPassword)}
        onSubmit={handleSubmit}
        onGoogleAuth={handleGoogleAuth}
        additionalLinks={
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Forgot your password?
            </Link>
          </div>
        }
        privacyText={
          <div className="text-center">
            This site is protected by reCAPTCHA and the Google{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </Link>{" "}
            apply.
          </div>
        }
      />
    </AuthLayout>
  );
});

export default Login;
