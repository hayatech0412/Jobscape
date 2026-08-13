import React, { useState } from "react";

export default function CustomCheckbox({ type, label, checked, onChange }) {
    return (
        <label className="inline-flex flex-wrap gap-3 items-center cursor-pointer text-[14px] leading-none">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => { onChange(e.target.checked) }}      
                className="appearance-none w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
            />
            <span>{label}</span>

            {type === '必須' && (
                <div className="flex items-center h-[20px] rounded-sm text-[10px] leading-none px-2 py-[3px] bg-red-500 text-white">*必須</div>
            )}

            {type === '任意' && (
                <div className="flex items-center h-[20px] rounded-sm text-[10px] leading-none px-2 py-[3px] bg-gray-500 text-white">任意</div>
            )}
        </label>
    );
}
