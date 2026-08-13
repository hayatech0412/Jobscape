import axios from "axios";
import { Link } from "@inertiajs/react";
import NotificationIcon from "@/Components/Icons/NotificationIcon";
import NotificationBadge from "@/Components/NotificationBadge";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function NotificationButton({ notify }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(notify.unopen === 0);

    const toggleMenu = () => {
        setIsConfirm(true);

        if (!isOpen) {
            axios.get(route("company.notifications.open")).then((response) => {
                setIsConfirm(
                    response.data && response.data.result === "success"
                );
            });
        }
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

    const handleGoDetail = (id) => {
        Inertia.visit(`/company/notifications/${id}`);
    };

    return (
        <button className="ml-4 relative" onClick={toggleMenu}>
            <NotificationIcon />
            {!isConfirm && notify.unread > 0 && <NotificationBadge number={notify.unread} />}

            <ul
                ref={menuRef}
                className={`absolute top-8 right-0 w-[200px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg py-4 z-50 ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                {notify?.notifications?.length > 0 &&
                    notify.notifications.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className="px-2 overflow-hidden"
                                onClick={(e) => handleGoDetail(item.id)}
                            >
                                <div className="text-left p-2 border-t border-gray-200 hover:bg-gray-100 overflow-hidden line-clamp-2">
                                    <h2
                                        className={`line-clamp-2 ${
                                            item.is_read_by_auth
                                                ? "text-gray-400"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {item.title}
                                    </h2>
                                </div>
                            </li>
                        );
                    })}
                {notify?.notifications?.length > 0 && (
                    <li className="px-2">
                        <Link
                            href={route("company.notifications.index")}
                            className={`block text-center p-2 border-t border-gray-200 hover:bg-gray-100 text-gray-700`}
                        >
                            全て見る
                        </Link>
                    </li>
                )}
                {notify?.notifications?.length === 0 && (
                    <li className="px-4 hover:bg-gray-100">
                        <div className="block text-center py-2">
                            お知らせはありません
                        </div>
                    </li>
                )}
            </ul>
        </button>
    );
}
