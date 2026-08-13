import { Link, useForm } from '@inertiajs/react';
import dayjs from "dayjs";
import ArrowRight from "../Icons/ArrowRight";

export default function ProductRowItem({
    transaction,
}) {

    const formatDate = (dateString) => {
        return dayjs(dateString).format("YYYY/MM/DD");
    };

    return (
        <Link href={route('transaction', [transaction.id])} className="flex border-b py-4 border-gray-200 items-center cursor-pointer">
            <div className="w-[120px] h-[80px]">
                <img className="h-full w-full object-cover" src={transaction?.product?.main_image} alt="" />
            </div>
            <div className="ml-4 flex-1">
                <h3>
                    {transaction?.product?.name}
                </h3>
                <div className="mt-3">
                    <span className="text-gray-500 font-bold">{formatDate(transaction.created_at)}</span>
                    <span className="text-blue-600 font-bold ml-12 inline-block">ID: {transaction.code}</span>
                    {
                        transaction.status == 3 ? <span className="text-red-600 border rounded-full border-red-600 px-2 py-1 text-xs ml-2 inline-block">不成立</span>:null
                    }
                </div>
            </div>
            <div className="ml-4">
                <ArrowRight className="size-4" />
            </div>
        </Link>
    )
}