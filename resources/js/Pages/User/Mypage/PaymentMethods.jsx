import React, { useState, useEffect } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import ArrowUnder from '@/Components/Icons/ArrowUnder';
import { Link, useForm } from '@inertiajs/react';
import dayjs from "dayjs";
import ArrowTop from '@/Components/Icons/ArrowTop';

export default function PaymentMethods({
    payments,
    status,
}) {

    const [paymentList, setPaymentList] = useState([]);
    const [allHistory, setAllHistory] = useState(false);

    useEffect(() => {
        if (payments.length > 3) {
            let temp = [];
            for (let i = 0; i < 3; i++) {
                temp.push(payments[i]);
            }
            setPaymentList(temp);
        } else {
            setPaymentList(payments);
        }
    }, [payments]);

    const setAllPayments = () => {
        if (!allHistory) {
            setAllHistory(true);
            setPaymentList(payments);
        } else {
            setAllHistory(false);
            if (payments.length > 3) {
                let temp = [];
                for (let i = 0; i < 3; i++) {
                    temp.push(payments[i]);
                }
                setPaymentList(temp);
            } else {
                setPaymentList(payments);
            }
        }
    }

    const formatDate = (dateString) => {
        return dayjs(dateString).format("YYYY/MM/DD");
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    return (
        <UserAuthMainLayout>
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-8 font-bold">お支払い</div>

                        <div className="">
                            <div className="text-[16px] mb-4">お支払い方法</div>
                            <div className=""></div>
                        </div>

                        <div className="mb-6">
                            <div className="w-full max-w-[400px] border border-gray-400 p-6 ">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 ">
                                        <img className="w-16" src="/assets/images/visa.png" alt="Card" />
                                        <div className="flex flex-col justify-center gap-2 ">
                                            <div className="text-[14px]">下 4桁：1234</div>
                                            <div className="text-[12px] text-gray-400">有効期間：01/28</div>
                                        </div>
                                    </div>
                                    <div className="pb-1 text-[12px] border-b border-gray-600">更新</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-[14px] text-[#3370ff] cursor-pointer mb-12">お支払い方法を追加</div>

                        <div className="flex items-center justify-between mb-4 ">
                            <div className="text-[14px]">支払い履歴</div>
                        </div>
                        <div className="mb-8">
                            JOBSCAPEアカウントに関するこれまでの請求書や領収書を閲覧できます。
                        </div>

                        <div className="overflow-x-auto">

                            {
                                paymentList.length > 0 ? (
                                    <table className="table-auto w-full border-collapse">
                                        <thead>
                                            <tr className="border-b text-left border-gray-200 ">
                                                <th className="px-4 py-4">日付</th>
                                                <th className="px-4 py-4">説明</th>
                                                <th className="px-4 py-4">ステータス</th>
                                                <th className="px-4 py-4">金額</th>
                                                <th className="px-4 py-4">その他</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                paymentList.map((payment, index) => (
                                                    <tr key={'payment' + '-' + payment.id} className="border-b border-gray-200">
                                                        <td className="px-4 py-4">{formatDate(payment.paid_at)}</td>
                                                        <td className="px-4 py-4">{payment.description}</td>
                                                        <td className="px-4 py-4">{payment.status == status.COMPLETE ? ('完了'): ('未完了')}</td>
                                                        <td className="px-4 py-4">¥{formatNumber(payment.amount)}</td>
                                                        <td className="px-4 py-4">...</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-[16px] text-center">支払い履歴がありません。</div>
                                )
                            }
                        </div>

                        <div onClick={setAllPayments} className="flex items-center justify-end h-16 gap-1 cursor-pointer">
                            <div className="text-[12px]">{allHistory ? '一部表示' : 'すべて表示'}</div>
                            {allHistory ? (<ArrowTop className="size-4" />) : (<ArrowUnder className="size-4" />)}

                        </div>
                    </div>

                </div>
            </div>
        </UserAuthMainLayout>
    );
}
