import React, { useEffect } from 'react';
import ArrowRight from '@/Components/Icons/ArrowRight';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import ArrowLeft from '@/Components/Icons/ArrowLeft';
import { Link, usePage } from '@inertiajs/react';
import { formatNumber } from '@/Plugins/helper';
import dayjs from "dayjs";

export default function HistoryBalance() {
    const { historyData, summary } = usePage().props;
    const currentBalance = summary.income - summary.outgo - summary.withdrawal_fee - summary.tax - summary.handling_fee;
    return (
        <UserAuthMainLayout>
            <div className="w-full min-h-screen bg-[#f3f6fb] py-10">
                <div className="w-[92%] max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-9/12 w-full bg-white rounded-xl shadow-md px-6 py-8">
                        <div className="text-xl font-semibold mb-6">残高履歴</div>
                        <div className="overflow-x-auto text-center">
                            <table className="table-auto w-full border-collapse text-md">
                                <thead>
                                    <tr className="text-gray-600 border-b">
                                        <th className="px-4 py-3 text-left">取引日</th>
                                        <th className="px-4 py-3 text-left">内容</th>
                                        <th className="px-4 py-3">申請金額</th>
                                        <th className="px-4 py-3">入金</th>
                                        <th className="px-4 py-3">出金</th>
                                        <th className="px-4 py-3">源泉徴収税</th>
                                        <th className="px-4 py-3">残高</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyData?.data?.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-4 text-left">{dayjs(item.date).format('DD/MM/YYYY')}</td>
                                            <td className="px-4 py-4 text-left">{item.note}</td>
                                            <td className="px-4 py-4">{item.request_amount ? `¥${formatNumber(item.request_amount)}` : ''}</td>
                                            <td className="px-4 py-4">{item.in ? `¥${formatNumber(item.in)}` : ''}</td>
                                            <td className="px-4 py-4">{item.out ? `¥${formatNumber(item.out)}` : ''}</td>
                                            <td className="px-4 py-4">{item.tax_amount ? `¥${formatNumber(item.tax_amount)}` : ''}</td>
                                            <td className="px-4 py-4 font-semibold">¥{formatNumber(item.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-12'>
                            <div className="flex items-center justify-between">
                                { historyData.prev_page_url ?
                                    (
                                        <Link href={historyData.prev_page_url} className={"flex items-center relative justify-center w-24 h-10 bg-white rounded-md border-2 border-[#3370ff]"}>前へ
                                            <ArrowLeft className="absolute top-[10px] left-1 size-4"></ArrowLeft>
                                        </Link>
                                    ) : (
                                        <div className="w-24"></div>
                                    )
                                }

                                <div className="">{historyData.from}件~{historyData.to}件 (全{historyData.total}件)</div>
                                { historyData.next_page_url ?
                                    (
                                        <Link href={historyData.next_page_url} className="flex items-center relative justify-center w-24 h-10 bg-white rounded-md border-2 border-[#3370ff]">次へ
                                            <ArrowRight className="absolute top-[10px] right-1 size-4"></ArrowRight>
                                        </Link>
                                    ) : (
                                        <div className="w-24"></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/12 w-full flex flex-col gap-6">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl p-6 shadow-lg border-b">
                            <div className="text-sm mb-1">{dayjs().format('DD/MM/YYYY')}</div>
                            <div className="text-lg">残高</div>
                            <div className="text-4xl font-bold mt-2">¥{formatNumber(currentBalance)}</div>
                        </div>
                        <div className="bg-white border rounded-xl p-6 shadow-sm text-sm">
                            <div className="text-lg font-bold mb-4">合計</div>
                            <div className="flex justify-between py-3 border-b"><span>申請金額</span><span>¥{formatNumber(summary.request_amount)}</span></div>
                            <div className="flex justify-between py-3 border-b"><span>入金</span><span>¥{formatNumber(summary.income)}</span></div>
                            <div className="flex justify-between py-3 border-b"><span>出金</span><span>¥{formatNumber(summary.outgo)}</span></div>
                            <div className="flex justify-between py-3 border-b"><span>振込手数料</span><span>¥{formatNumber(summary.withdrawal_fee)}</span></div>
                            <div className="flex justify-between py-3 border-b"><span>取扱手数料</span><span>¥{formatNumber(summary.handling_fee)}</span></div>
                            <div className="flex justify-between py-3"><span>源泉徴収税</span><span>¥{formatNumber(summary.tax)}</span></div>
                        </div>
                    </div>

                </div>
            </div>
        </UserAuthMainLayout>
    )
}