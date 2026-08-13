import AngleIcon from "./Icons/AngleIcon";
import { useState } from "react";

export default function StatusAccordion({
    children, 
    date, 
    title, 
    status, 
    className = "", 
    currentStatus, 
    openable, 
    disabled, 
    notag = false
}) {
    const [isOpen, setIsOpen] = useState(currentStatus === status && openable);

    const toggleAccordion = () => {
        if (!openable) return;
        setIsOpen((prev) => !prev);
    };

    // 繰り返し使用される状態を変数化
    const isFinalStatus = currentStatus === 5;
    const bgColorClass = !disabled && isFinalStatus 
        ? "bg-[#626262] text-white" 
        : (disabled ? "bg-gray-100" : "");

    return (
        <div>
            <div 
                className={`w-full py-2 md:py-[12px] shadow-md px-2 md:px-6 border border-gray-200 rounded-lg ${notag ? 'mb-4' : ''} ${bgColorClass} ${className}`}
            >
                <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={toggleAccordion}
                >
                    <div className={`text-lg flex-1 ${isOpen ? "text-primary" : ""}`}>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <p className={`text-sm text-gray-500 ${openable ? 'mr-10' : 'mr-14'} ${isFinalStatus ? 'text-white' : ''}`}>
                            {date}
                        </p>
                        {openable ? (
                            <AngleIcon
                                size={4}
                                className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                        ) : null}
                    </div>
                </div>

                {isOpen && (
                    <div className="py-2 md:py-4">
                        {children}
                    </div>
                )}
            </div>

            {!notag && <div className="h-4 w-[2px] ml-12 bg-blue-500"></div>}
        </div>
    );
}
