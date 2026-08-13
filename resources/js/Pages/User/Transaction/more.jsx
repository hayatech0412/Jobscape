import React, { useState, useEffect } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import ProductRowItem from '@/Components/Users/ProductRowItem';
import { Link, useForm } from '@inertiajs/react';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ArrowLeft from '@/Components/Icons/ArrowLeft';
import dayjs from "dayjs";

export default function more({
    transactions,
    status
}) {

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }
    const formatDate = (dateString) => {
        return dayjs(dateString).format("YYYY/MM/DD");
    };

    const detail = (id) => {
        window.location.href = route('transaction', [id]);
    }

    return (
        <UserAuthMainLayout>
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-8 font-bold">
                            { status == 0 ? '紹介済みの取引' : (status == 1 ? '進行中の取引' : '完了した取引')}
                        </div>

                        <div className="overflow-x-auto text-center">
                            <table className="table-auto w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-300 bg-gray-100">
                                        <th className="px-4 py-4 text-center">紹介価格</th>
                                        <th className="px-4 py-4 text-center">販売手数料</th>
                                        <th className="px-4 py-4 text-center">税率</th>
                                        <th className="px-4 py-4 text-center">紹介利益</th>
                                        <th className="px-4 py-4 text-center">{ status == 2 ? '取引完了日' : '紹介日'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { transactions.data.map((transaction, index) => (
                                        <tr key={status + '-' + transaction.id} className="border-b border-gray-200 cursor-pointer" onClick={() => {detail(transaction.id)}}>
                                            <td className="px-4 py-4">{formatNumber(transaction.product.reward_amount)}{transaction.product.reward_type == 1 ? ('¥'): ('%')}</td>
                                            <td className="px-4 py-4">¥{formatNumber(transaction.sales_amount)}</td>
                                            <td className="px-4 py-4">10%</td>
                                            <td className="px-4 py-4">¥100</td>
                                            <td className="px-4 py-4">{transaction.product.completed_at ? formatDate(transaction.product.completed_at) : formatDate(transaction.product.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div className='mt-12'>
                            <div className="flex items-center justify-between">
                                { transactions.prev_page_url ?
                                    (
                                        <Link href={transactions.prev_page_url} className={"flex items-center relative justify-center w-24 h-10 bg-white rounded-md border-2 border-[#3370ff]"}>前へ
                                            <ArrowLeft className="absolute top-[10px] left-1 size-4"></ArrowLeft>
                                        </Link>
                                    ) : (
                                        <div className="w-24"></div>
                                    )
                                }

                                <div className="">{transactions.from}件~{transactions.to}件 (全{transactions.total}件)</div>
                                { transactions.next_page_url ?
                                    (
                                        <Link href={transactions.next_page_url} className="flex items-center relative justify-center w-24 h-10 bg-white rounded-md border-2 border-[#3370ff]">次へ
                                            <ArrowRight className="absolute top-[10px] right-1 size-4"></ArrowRight>
                                        </Link>
                                    ) : (
                                        <div className="w-24"></div>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
