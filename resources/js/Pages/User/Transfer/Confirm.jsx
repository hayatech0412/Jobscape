import React, { useState } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import ArrowRight from '@/Components/Icons/ArrowRight';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Confirm({
    profile,
    bank_account
}) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
    });

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('transfer.confirm.store'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <UserAuthMainLayout>            
            <div className="w-full mx-auto mb-20 md:mb-20 ">
                <div className="w-[92%] mx-auto my-[4%] px-[4%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="text-[20px] mb-8">振込申請確認</div>

                    <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-10 ">

                        <div className="flex border-b border-gray-200 pb-4 my-4 text-[14px]">
                            <div className="text-[16px] font-normal">振込内容</div>                       
                        </div>

                        <div className="flex flex-col space-y-3  border-gray-200 pb-4 ">
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">現在の残高</div>
                                <div className="">¥{ formatNumber(profile.amount) }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">振込申請金額</div>
                                <div className="">¥{ formatNumber(flash.amount_info.request_amount) }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">源泉徴収額</div>
                                <div className="">¥{ formatNumber(flash.amount_info.tax_amount) }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">振込手数料</div>
                                <div className="">¥{ formatNumber(flash.amount_info.amount_fee) }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">振込金額</div>
                                <div className="text-[16px] text-[#ee414c]">¥{ formatNumber(flash.amount_info.amount) }</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-8 ">

                        <div className="flex border-b border-gray-200 pb-4 my-4 text-[14px]">
                            <div className="text-[16px] font-normal">振込先</div>                       
                        </div>

                        <div className="flex flex-col space-y-3  border-gray-200 pb-4 ">
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">銀行</div>
                                <div className="">{ bank_account.bank_name }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">口座種別</div>
                                <div className="">{ bank_account.account_type }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">支店コード</div>
                                <div className="">{ bank_account.shop_code }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">口座番号</div>
                                <div className="">{ bank_account.account_code }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">口座名義(セイ)</div>
                                <div className="">{ bank_account.account_last_name }</div>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <div className="">口座名義(メイ)</div>
                                <div className="">{ bank_account.account_first_name }</div>
                            </div>
                        </div>
                    </div> 
                    
                    <div className="leading-6 text-[12px]">
                        毎月1日～15日までに振込申請されたものは、15日を締日として5営業日以内に<br />
                        毎月16日～末日までに振込申請されたものは、末日を締日として5営業日以内にお振込みいたします。
                        {/* <Link className="text-[#3370ff] font-normal text-[12px]">振込日を確認</Link>してください。<br />
                        振込申請中に新たに申請することはできません。 */}
                    </div>      

                    
                    <Link className="border-b border-t border-gray-200 flex items-center justify-between h-16 mt-16">
                        <div className="text-[14px]">振込可能額について</div>
                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                    </Link>
                    <Link className="border-b border-gray-200 flex items-center justify-between h-16 mb-4">
                        <div className="text-[14px]">振込スケジュールについて</div>
                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                    </Link>
                </div>

                <div className="text-center mt-16 mb-8">
                    <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                        次へ
                    </PrimaryButton>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
