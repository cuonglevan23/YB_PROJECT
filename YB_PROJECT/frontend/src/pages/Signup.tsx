import { memo, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

const Signup = memo(function Signup() {
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
      // Add your signup logic here
      console.log("Signup attempt:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setError("Failed to create account");
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
      placeholder: "Add your email",
      required: true,
    },
    {
      name: "password",
      type: "password" as const,
      placeholder: "Create a password",
      required: true,
      showPasswordToggle: true,
    },
  ];

  return (
    <AuthLayout>
      <AuthForm
        title="Sign up to vidIQ"
        fields={fields}
        submitButtonText="Create your account"
        submitButtonLoadingText="Creating account..."
        googleButtonText="Sign up with Google"
        formData={formData}
        showPassword={showPassword}
        loading={loading}
        error={error}
        footerText="Already have an account?"
        footerLinkText="Log in"
        footerLinkTo="/login"
        onInputChange={handleInputChange}
        onPasswordToggle={() => setShowPassword(!showPassword)}
        onSubmit={handleSubmit}
        onGoogleAuth={handleGoogleAuth}
        privacyText={
          <div className="text-center">
            By creating a vidIQ account you agree with vidIQ's{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </Link>
            <br />
            <br />
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

export default Signup;
