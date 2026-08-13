import React, { useState, useEffect } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";

export default function Index({
    bank_account
}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        bank_name: bank_account.bank_name ?? '',
        account_type: bank_account.account_type ?? '',
        account_code: bank_account.account_code ?? '',
        shop_code: bank_account.shop_code ?? '',
        account_last_name: bank_account.account_last_name ?? '',
        account_first_name: bank_account.account_first_name ?? '',
    });

    const submit = (e) => {
        Inertia.visit(route('transfer.amount'))
    }

    return (
        <UserAuthMainLayout>        
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%] px-[4%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="bg-white rounded-lg p-[50px] w-[350px] mx-auto" >
                        <div className="text-center font-semibold text-[18px] mb-6">
                            こちらの振込先で<br />登録してよろしいですか？
                        </div>
                        <div className="text-center text-[14px] mb-8 leading-6">
                            銀行：{ data.bank_name }<br />
                            口座種別：{ data.account_type }<br />
                            支店コード：{ data.shop_code }<br />
                            口座番号：{ data.account_code }<br />
                            口座名義(メイ)：{ data.account_last_name }<br />
                            口座名義(セイ)：{ data.account_first_name }
                        </div>
                        <button onClick={submit} className="bg-[#3370ff] h-12 rounded-full w-full flex justify-center items-center text-white text-[14px] mb-4 hover:opacity-80 focus:opacity-80 font-semibold">
                            申請する
                        </button>
                        <Link href={route('transfer.info.edit')} className="border border-gray-200 h-12 rounded-full w-full flex justify-center items-center text-[14px] hover:opacity-80 focus:opacity-80 font-semibold">
                            修正する
                        </Link>
                    </div>
                </div>
            </div>    
        </UserAuthMainLayout>
    );
}
