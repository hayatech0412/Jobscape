import React, { useState } from "react";

export default function CircleCheckBox({ 
    id, 
    width, 
    type, 
    label, 
    checked, 
    onChange 
}) {
    const handleClick = (e) => {
        onChange(id, !checked);
    }
    return (
        <label className="inline-flex flex-wrap gap-3 items-center cursor-pointer text-[14px]">
            <div 
                onClick={handleClick} className={`w-${width ?? 6} h-${width ?? 6} text-[${width ? 4 * width : 20}px] font-semibold rounded-full ${checked ? 'bg-[#3370ff] text-white' : 'border border-gray-200'} flex items-center justify-center`}>
                {checked ? '✓' : ''}
            </div>
            {label && (
                <span>{label}</span>
            )}            

            {type === '必須' && (
                <div className="flex items-center h-[20px] rounded-sm text-[10px] leading-none px-2 py-[3px] bg-red-500 text-white">*必須</div>
            )}

            {type === '任意' && (
                <div className="flex items-center h-[20px] rounded-sm text-[10px] leading-none px-2 py-[3px] bg-gray-500 text-white">任意</div>
            )}
        </label>
    );
}
