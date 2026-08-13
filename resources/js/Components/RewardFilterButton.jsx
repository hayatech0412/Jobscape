import { Link } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from 'react';
import CheckIcon from "@/Components/Icons/CheckIcon";
import ArrowUnder from "@/Components/Icons/ArrowUnder";

export default function RewardFilterButton({
    reward_filter_type,
    onSelect,
    current,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleType = (index, value) => {
        setFilterStatus(index);
        setIsOpen(!isOpen)
        onSelect(value);
    }

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className='relative flex flex-col justify-center items-center cursor-pointer' onClick={toggleMenu}>
            <span className="flex items-center justify-center text-[14px] gap-2 leading-none">                
                <span>報酬タイプ</span><ArrowUnder className="size-4" />
            </span>
            <ul ref={menuRef} className={`z-10 absolute top-6 left-0 w-[150px] bg-white text-[14px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg py-4 ${isOpen ? 'block' : 'hidden'}`}>
                {reward_filter_type.map((item, index) => (
                    <li key={index}>
                        <button onClick={() => toggleType(index, item.value)} className='flex items-center justify-start w-full py-2 text-left hover:bg-gray-100'>
                            { current == item.value ? <CheckIcon className="w-[40px]" /> : <span className="w-[40px]"></span> }
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}