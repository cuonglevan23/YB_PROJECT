import { memo, useCallback } from "react";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  formatValue?: (value: number) => string;
  unit?: string;
  className?: string;
}

export const RangeSlider = memo(function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
  step = 1,
  formatValue,
  unit = "",
  className = "",
}: RangeSliderProps) {
  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Number(e.target.value);
      if (newMin <= value[1]) {
        onChange([newMin, value[1]]);
      }
    },
    [value, onChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Number(e.target.value);
      if (newMax >= value[0]) {
        onChange([value[0], newMax]);
      }
    },
    [value, onChange]
  );

  const formatDisplayValue = (val: number) => {
    if (formatValue) return formatValue(val);
    return `${val.toLocaleString()}${unit}`;
  };

  const percentage1 = ((value[0] - min) / (max - min)) * 100;
  const percentage2 = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <div className="text-sm text-gray-400">
          {formatDisplayValue(value[0])} - {formatDisplayValue(value[1])}
        </div>
      </div>

      <div className="relative">
        {/* Track */}
        <div className="h-2 bg-gray-700 rounded-full relative">
          {/* Active range */}
          <div
            className="absolute h-2 bg-blue-500 rounded-full"
            style={{
              left: `${percentage1}%`,
              width: `${percentage2 - percentage1}%`,
            }}
          />
        </div>

        {/* Range inputs */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleMinChange}
          className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleMaxChange}
          className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
        />
      </div>
    </div>
  );
});
