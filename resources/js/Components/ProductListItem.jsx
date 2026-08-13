import { Link } from '@inertiajs/react';

export default function ProductListItem({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link className="bg-white flex flex-col">
            <img
                src="/assets/images/company_regist_step1.png"
                alt="product"
                className="h-40 w-full object-cover rounded-md"
            />
            <div className="flex flex-col gap-2 mt-3 mx-auto w-[90%] pb-6">
                <div className="flex flex-wrap gap-1">
                    <div className="leading-none py-[4px] px-[14px] rounded-full border border-gray-400 text-[10px] text-gray-400">不動産</div>
                    <div className="leading-none py-[4px] px-[14px] rounded-full border border-gray-400 text-[10px] text-gray-400">不動産</div>
                    <div className="leading-none py-[4px] px-[14px] rounded-full border border-gray-400 text-[10px] text-gray-400">不動産</div>
                </div>
                <h2 className="text-[12px] font-bold line-clamp-2">テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</h2>
                <p className="text-[12px] text-gray-600">テキストが入ります。</p>
                <p className="text-[18px]">¥100,000</p>
            </div>
        </Link>
    );
}

