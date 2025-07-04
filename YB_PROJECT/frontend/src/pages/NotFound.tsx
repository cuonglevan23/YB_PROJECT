import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/buttons";

const NotFound = memo(function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-2">404</div>
          <div className="text-gray-400">
            <svg
              className="w-24 h-24 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.206 0-4.244.896-5.709 2.291M15 17h.01M9 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Trang không tìm thấy
          </h1>
          <p className="text-gray-600 mb-6">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full">
              Về trang chủ
            </Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Quay lại trang trước
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Bạn có thể thử:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Kiểm tra lại đường dẫn URL</li>
            <li>• Sử dụng menu điều hướng</li>
            <li>• Liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default NotFound;
