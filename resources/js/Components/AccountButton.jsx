import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function AccountButton({ user }) {
    const { post } = useForm();

    const [isOpen, setIsOpen] = useState(false);
    const { auth } = usePage().props;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route(auth.guard + ".logout"));
    };

    return (
        <div
            className="relative flex items-center space-x-2 cursor-pointer"
            onClick={toggleMenu}
        >
            <div className="w-[30px] h-[30px] rounded-full object-contain overflow-hidden">
                <img src={user?.avatar_url} alt="avatar" className="w-full" />
            </div>
            <ul
                ref={menuRef}
                className={`absolute top-8 right-0 w-[200px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg py-4 z-50 ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                <li>
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            ログアウト
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
}
