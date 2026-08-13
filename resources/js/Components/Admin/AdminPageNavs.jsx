import React from "react";
import { Head, Link, useForm, } from '@inertiajs/react';

const AdminPageNavs = ({
    items
}) => {
    return (
        <div className="flex justify-center items-center mt-4 gap-2 mb-[200px]">
            {/* << Link */}
            {items.current_page > 1 && (
                <Link
                    href={items.first_page_url}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                >
                    ≪
                </Link>
            )}

            {/* < Link */}
            {items.prev_page_url && (
                <Link
                    href={items.prev_page_url}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                >
                    &lt;
                </Link>
            )}

            {/* Page Numbers */}
            <div className="flex gap-2 items-center">
                {/* Always display the first page */}
                <Link
                    href={`${items.path}?page=1`}
                    className={`px-4 py-2 text-gray-700 rounded-md hover:bg-gray-300 ${items.current_page === 1 ? 'bg-blue-500 text-white' : ''}`}
                >
                    1
                </Link>

                {/* Ellipsis if necessary */}
                {items.current_page > 4 && <span className="px-4 py-2 text-gray-700">...</span>}

                {/* Pages around the current page */}
                {Array.from({ length: 7 }, (_, i) => {
                    const page = items.current_page - 3 + i;
                    if (page > 1 && page < items.last_page) {
                        return (
                            <Link
                                key={page}
                                href={`${items.path}?page=${page}`}
                                className={`px-4 py-2 text-gray-700 rounded-md hover:bg-gray-300 ${items.current_page === page ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {page}
                            </Link>
                        );
                    }
                    return null;
                })}

                {/* Ellipsis if necessary */}
                {items.current_page < items.last_page - 3 && (
                    <span className="px-4 py-2 text-gray-700">...</span>
                )}

                {/* Always display the last page */}
                {items.last_page > 1 && (
                    <Link
                        href={`${items.path}?page=${items.last_page}`}
                        className={`px-4 py-2 text-gray-700 rounded-md hover:bg-gray-300 ${items.current_page === items.last_page ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {items.last_page}
                    </Link>
                )}
            </div>

            {/* > Link */}
            {items.next_page_url && (
                <Link
                    href={items.next_page_url}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                >
                    &gt;
                </Link>
            )}

            {/* >> Link */}
            {items.current_page < items.last_page && (
                <Link
                    href={items.last_page_url}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                >
                    ≫
                </Link>
            )}
        </div>
    );
};

export default AdminPageNavs;
