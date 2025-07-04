import { memo } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const About = memo(function About() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t("aboutTitle")}
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">{t("aboutDescription")}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t("technologiesUsed")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{t("frontend")}</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• {t("modernUI")}</li>
                  <li>• {t("typeSafety")}</li>
                  <li>• {t("fastBuild")}</li>
                  <li>• {t("utilityCSS")}</li>
                  <li>• {t("clientRouting")}</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Development</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• pnpm - Package manager</li>
                  <li>• ESLint - Code linting</li>
                  <li>• VS Code - IDE tối ưu</li>
                  <li>• GitHub Copilot - AI assistance</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>

            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Hot Module Replacement (HMR) cho development nhanh chóng
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Type safety với TypeScript
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Responsive design với Tailwind CSS
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Component-based architecture
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Modern routing với React Router v6
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;
