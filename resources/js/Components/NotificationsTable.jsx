// import moment from "moment";

import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";

export default function NotificationsTable({ headers, data }) {
    const { auth } = usePage().props;

    const getWidth = (header) => {
        switch (header) {
            case "created_at":
                return "w-[200px]";
            default:
                return "";
        }
    };

    const handleGoDetail = (id) => {
        if (auth.guard === 'company') {
            Inertia.visit(`/company/notifications/${id}`);
        } else {
            Inertia.visit(`/notifications/${id}`);
        }
    }

    return (
        <div className="overflow-x-auto p-2 bg-white mt-8 ">
            <table className="mb-8 w-full min-w-[800px]">
                <thead>
                    <tr className="bg-white border border-l-0 border-t-0 border-r-0">
                        <th className="text-left py-4 px-4 w-[80px]">番号</th>
                        {headers.map((item, index) => (
                            <th
                                key={index}
                                className={`text-center py-4 px-4 ${getWidth(
                                    item.value
                                )}`}
                            >
                                {item.text}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data &&
                        data.data.map((notification, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="even:bg-gray-100 hover:bg-blue-100 bg-white hover:cursor-pointer"
                                    onClick={(e) => handleGoDetail(notification.id)}
                                >
                                    <td className="py-4 px-4 text-center">
                                        {data.meta.from + index}
                                    </td>
                                    <td className="py-4 px-2">
                                        <p className={`${notification.is_read_by_auth ? 'text-gray-400' : 'text-gray-800'}`}>{notification.title}</p>
                                    </td>

                                    <td className="py-4 px-2 text-center">
                                        {notification.created_at_jp}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
