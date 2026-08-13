import { Link } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from 'react';
import CheckIcon from "@/Components/Icons/CheckIcon";
import SortIcon from "@/Components/Icons/SortIcon";

export default function ProductSortButton({
    options, 
    defaultValue,
    onChange = () => {},
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(defaultValue ?? null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleValue = (newValue) => {
        setValue(newValue);
        setIsOpen(!isOpen)
        if(onChange) onChange(newValue);
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
        <div className='relative flex flex-col justify-center items-center space-x-2 cursor-pointer' onClick={toggleMenu}>
            <span className="flex flex-col items-center justify-center w-[62px] text-[12px] gap-1 leading-none">
                <SortIcon className="size-4" color='#333333' />
                {options.find(x => x.value == value)?.label ?? options[0].label}
            </span>
            <ul ref={menuRef} className={`z-10 absolute top-10 right-0 w-[150px] bg-white text-[14px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg py-4 ${isOpen ? 'block' : 'hidden'}`}>
                {options.map((item, index) => (
                    <li key={index}>
                        <button onClick={() => toggleValue(item.value)} className='flex items-center justify-start w-full py-2 text-left hover:bg-gray-100'>
                            { value == item.value ? <CheckIcon className="w-[30px]" /> : <span className="w-[30px]"></span> }
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}