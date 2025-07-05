import { memo } from "react";

interface ResearchHeaderProps {
  title: string;
  description: string;
}

export const ResearchHeader = memo(function ResearchHeader({
  title,
  description,
}: ResearchHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-white text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
});
