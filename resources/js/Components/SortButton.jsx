import React, { useState, useRef, useEffect } from 'react';
import CheckIcon from "./Icons/CheckIcon";
import SortIcon from "./Icons/SortIcon";

export default function SortButton({products_sort_filters, className}) {

    const [isOpen, setIsOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleType = (index) => {
        setFilterStatus(index);
        setIsOpen(!isOpen)
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
        <div className={`relative flex items-center space-x-2 ${className}`} onClick={toggleMenu}>
            <span className="flex items-center justify-end"><SortIcon className="rotate-180 ml-3" color='#333333' /></span>
            <ul ref={menuRef} className={`absolute top-8 right-0 w-[200px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg p-4 ${isOpen ? 'block' : 'hidden'}`}>
                {products_sort_filters.map((item, index) => (
                    <li key={index}>
                        <button onClick={() => toggleType(index)} className='flex items-center justify-start py-2 text-left hover:bg-gray-100'>
                        {
                            filterStatus === index ? <CheckIcon className="w-[30px]" /> : <span className="w-[30px]"></span>
                        }
                            {item.label}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}