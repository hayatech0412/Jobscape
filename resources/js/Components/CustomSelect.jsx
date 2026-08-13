import React, { useEffect, useState } from "react";

export default function CustomSelect({    
    id = "",
    className = '',
    options, 
    first,
    onSelect,
    currentOption = '', // 親コンポーネントから渡される初期選択値
}) {
    const [selectedValue, setSelectedValue] = useState(currentOption);

    useEffect(() => {
        // currentOption が変更されたら selectedValue を更新
        setSelectedValue(currentOption);
    }, [currentOption]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
        if (onSelect) onSelect(value);
    };

    return (
        <div className={"relative inline-block" + ' ' + className}>
            <select
                value={selectedValue}
                onChange={handleChange}
                className={
                    "w-full text-[14px] appearance-none px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                }
            >   
                {first && (
                    <option value="" className="text-gray-400">
                        {first}
                    </option>
                )}
                {options.map((option) => (
                    <option key={id + (option.value ?? option)} value={option.value ?? option}>
                        {option.label ?? option}
                    </option>
                ))}
            </select>
        </div>
    );
}
