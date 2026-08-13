import CompanyTitle from "@/Components/Companies/CompanyTitle";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Pagination from "@/Components/Companies/Pagination";

export default function Payments({ transactions, statuses }) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(transactions.data.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        if (!amount) return '0';
        return amount.toLocaleString('ja-JP');
    };

    return (
        <CompanyAuthLayout>
            <div className="mt-4">
                <CompanyTitle>支払履歴</CompanyTitle>
            </div>

            <div className="mt-4 bg-white px-4 py-6 overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="text-sky-800 font-semibold">
                            <th className="px-2 py-1 text-left border">
                                <input
                                    type="checkbox"
                                    className="border border-gray-300 rounded-sm focus:outline-none focus:shadow-outline"
                                    checked={selectedItems.length === transactions.data.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-2 py-1 text-center border">
                                取引ID
                            </th>
                            <th className="px-2 py-1 text-center border">
                                取引成立日
                            </th>
                            <th className="px-2 py-1 text-center border">
                                対応状況
                            </th>
                            <th className="px-2 py-1 text-center border">
                                取引商材名
                            </th>
                            <th className="px-2 py-1 text-center border">
                                紹介者名
                            </th>
                            <th className="px-2 py-1 text-center border">
                                <span className="text-[12px]">
                                    システム利用料
                                </span>
                                (円)
                            </th>
                            <th className="px-2 py-1 text-center border">
                                入金状況▲
                            </th>
                            <th className="px-2 py-1 text-center border">
                                入金期間
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.data.map((transaction) => (
                            <tr key={transaction.id} className="even:bg-gray-100">
                            <td className="px-2 py-2 border">
                                <input
                                    type="checkbox"
                                    className="border border-gray-300 rounded-sm focus:outline-none focus:shadow-outline"
                                        checked={selectedItems.includes(transaction.id)}
                                        onChange={() => handleSelectItem(transaction.id)}
                                />
                            </td>
                                <td className="px-2 py-2 border">{transaction.code}</td>
                            <td className="px-2 py-2 border">
                                    {formatDate(transaction.created_at)}
                            </td>
                            <td className="px-2 py-2 border text-checkout">
                                    {statuses[transaction.status]?.label || ''}
                            </td>
                            <td className="px-2 py-2 border">
                                    {transaction.product?.name || ''}
                            </td>
                            <td className="px-2 py-2 border">
                                <div>
                                    <p className="text-[10px] text-gray-500">
                                            {transaction.user?.profile?.last_kana || ''} {transaction.user?.profile?.first_kana || ''}
                                    </p>
                                        <p>{transaction.user?.profile?.last_name || ''} {transaction.user?.profile?.first_name || ''}</p>
                                </div>
                            </td>
                            <td className="px-2 py-2 border text-right text-[18px]">
                                    ￥{formatCurrency(transaction.fee_amount)}
                            </td>
                            <td className="px-2 py-2 border text-checkout">
                                    {transaction.payed_status_text || ''}
                            </td>
                            <td className="px-2 py-2 border">
                                    {formatDate(transaction.last_payed_date)}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination meta={transactions.meta} links={transactions.links} />
            </div>
        </CompanyAuthLayout>
    );
}
