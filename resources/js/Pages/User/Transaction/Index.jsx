import React, { useState, useEffect } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import ProductRowItem from '@/Components/Users/ProductRowItem';
import { Link, useForm } from '@inertiajs/react';

export default function Index({
    transactions,
    status
}) {

    const select = (value) => {
        location.href = route('transactions') + '?status=' + value;
    }
    
    return (
        <UserAuthMainLayout>            
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-8 font-bold">取引履歴</div>
                        <ul className='flex items-stretch border-t border-b border-gray-200'>
                            <li className={`flex-1 font-bold ${status == 0 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                                <button className='w-full h-full py-4' onClick={() => { select(0) }}>紹介済</button>
                            </li>
                            <li className={`flex-1 font-bold ${status == 1 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                                <button className='w-full h-full py-4' onClick={() => { select(1) }}>進行中</button>
                            </li>
                            <li className={`flex-1 font-bold ${status == 2 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                                <button className='w-full h-full py-4' onClick={() => { select(2) }}>取引完了</button>
                            </li>
                        </ul>
                        <div className='mt-12'>
                            { 
                                transactions.data.length > 0 ? (
                                    transactions.data.map((transaction, index) => (
                                        <div key={ status + '-' + transaction.id + "-" + index}>
                                            <ProductRowItem 
                                                transaction={transaction} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-[16px] text-center">取引履歴がありません。</div>
                                )                                
                            }     

                            <Link href={route('transactions.more', [status])} className="text-white flex items-center justify-center mx-auto mt-12 rounded-full w-[240px] bg-blue-600 py-4">
                                もっと見る
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
