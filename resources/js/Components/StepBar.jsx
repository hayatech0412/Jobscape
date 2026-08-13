import React, { useState } from "react";

export default function StepBar({    
    className = '',
    step, 
    first,
    onSelect 
}) {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
        if (onSelect) onSelect(value);
    };

    return (
        <div className={"relative" + ' ' + className}>
            <div className="pt-3 ml-6 border-b border-gray-400 w-[calc(100%-3rem)]" />
            <div className="flex justify-between items-center -mt-3">
                <div className="flex flex-col items-center justify-center">
                    <div className={`w-6 h-6 rounded-full mb-2 ${step >= 0 ? 'md:bg-[#3370ff] bg-[#3370ff]' : 'bg-gray-400'}`}></div>
                    <div className={`text-[12px] ${step >= 0 ? 'md:text-[#3370ff] text-[#3370ff]' : 'text-gray-400'}`}>紹介済み</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className={`w-6 h-6 rounded-full mb-2 ${step >= 1 ? 'md:bg-[#3370ff] bg-[#3370ff]' : 'bg-gray-400'}`}></div>
                    <div className={`text-[12px] ${step >= 1 ? 'md:text-[#3370ff] text-[#3370ff]' : 'text-gray-400'}`}>商談中</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className={`w-6 h-6 rounded-full mb-2 ${step >= 2 ? 'md:bg-[#3370ff] bg-[#3370ff]' : 'bg-gray-400'}`}></div>
                    <div className={`text-[12px] ${step >= 2 ? 'md:text-[#3370ff] text-[#3370ff]' : 'text-gray-400'}`}>成約 or 失注</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className={`w-6 h-6 rounded-full mb-2 ${step == 4 ? 'md:bg-[#3370ff] bg-[#3370ff]' : 'bg-gray-400'}`}></div>
                    <div className={`text-[12px] ${step == 4 ? 'md:text-[#3370ff] text-[#3370ff]' : 'text-gray-400'}`}>取引完了</div>
                </div>
            </div>
        </div>
    );
}
