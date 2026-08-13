import React, { useEffect, useState } from "react";

export default function CustomRadioButtons({ 
  id="",
  divider,
  className,
  options = [], 
  currentOption, // 初期値として受け取る
  onChange, // 親コンポーネントから変更時に呼ばれるコールバック
}) {
  const [selectedOption, setSelectedOption] = useState(currentOption);

  useEffect(() => {
    // 親から渡された currentOption が変化したら反映
    setSelectedOption(currentOption);
  }, [currentOption]);

  const handleChange = (value) => {
    setSelectedOption(selectedOption);
    if (onChange) onChange(value); // 親コンポーネントに通知
  };

  return (
    <div className={`${divider ? '' : 'gap-2'} flex ${className ?? 'flex-col'} `}>
      {options.map((option, index) => (
        <div key={id + option.key + index}>
          <label
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              name="custom-radio"
              value={option.value}
              className="hidden peer"
              checked={selectedOption == option.value}
              onChange={() => handleChange(option.value)}
            />
            <div
              className={`w-5 h-5 border-2 rounded-full flex justify-center items-center ${selectedOption == option.value ? 'border-[#3370ff] bg-[#3370ff]' : 'border-gray-300'} `}
            >
              {selectedOption == option.value && (
                <div className="w-3 h-3 bg-white rounded-full"></div>
              )}
            </div>
            <span className="text-gray-700">{option.label}</span>
          </label>
          {index !== options.length - 1 && divider}
        </div>
      ))}
    </div>
  );
}
