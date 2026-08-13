import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import StepBar from '@/Components/StepBar';
import ArrowRight from '@/Components/Icons/ArrowRight';
import CircleCheckBox from '@/Components/CircleCheckBox';
import ShieldWithCheck from '@/Components/Icons/ShieldWithCheck';
import UserAuthLayout from '@/Layouts/UserAuthLayout';
import TransactionInfo from './TransactionInfo';
import BackButton from '@/Components/BackButton';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Transaction({
    plan,
    transaction,
    product,
    company,
    RewardTypes,
    TransactionStatus,
}) {
    const { data, setData, post, get, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('transfer'), {
            onFinish: () => reset('password'),
        });
    };

    function formatDate1(dateString) {
        return dayjs(dateString).format("YYYY年MM月DD日 HH:mm");
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    return (
        <UserAuthLayout>
            
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('transactions')} className="w-6 h-6 my-6"></BackButton>
            </div>

            <div className="w-[92%] max-w-[1200px] mx-auto">   
                <div className="block md:flex md:space-x-8 w-full mx-auto mb-20 md:mb-20 ">                
                    <TransactionInfo 
                        product={product} 
                        plan={plan} 
                        RewardTypes={RewardTypes} 
                        company={company} 
                        transaction={transaction}
                    />

                    <div className="grow">
                        <div className="text-[18px] mb-6">取引ステータス</div>
                        
                        <div className="bg-white shadow-md rounded-md pt-[8%] pb-[4%] mb-12 ">
                            <div className="w-[92%] max-w-[700px] mx-auto">
                                { transaction.status == TransactionStatus.COMPLETE ? (
                                    <div className="bg-[#e6f4f4] rounded-md text-center md:text-left" > 
                                        <div className="flex flex-col gap-2 w-[92%] max-w-[620px] mx-auto py-8 md:p-[4%] mb-6">
                                            <div className="md:flex items-center justify-between">
                                                <div className="flex items-center justify-center md:justify-start leading-none gap-3">
                                                    <CircleCheckBox checked={true} />
                                                    <div className="font-semibold text-[16px]">あなたの報酬が確定しました</div>
                                                </div>
                                                <div className=" lg:w-44 text-[30px]">¥{formatNumber(Math.round(transaction.bill_amount * plan.reward_rate / 100))}</div>
                                            </div>
                                            <div className="lg:flex items-center justify-between">
                                                <div className="text-[12px] mb-4 lg:mb-0">
                                                    この報酬の有効期間は<span className="text-[#3370ff]">2025/12/31</span>です
                                                </div>
                                                <div className="text-center">
                                                    <button onClick={submit} className="h-10 w-44 rounded-full bg-[#3370ff] text-white text-[14px] hover:opacity-90">振込申請する</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div></div>)} 

                                <div className="flex items-center justify-center gap-2 w-full h-12 bg-gray-200 mb-12">
                                    <span className="font-black text-[#e25d58] text-[24px]">✓</span>
                                    <span className="font-semibold text-[16px]">
                                        { transaction.status === TransactionStatus.COMPLETE ? '取引完了' : ''}
                                        { transaction.status === TransactionStatus.REQUESTED ? 'ご紹介がスタートしました' : ''}
                                        { transaction.status === TransactionStatus.ACCEPTED ? '報酬が確定されました' : ''}
                                        { transaction.status === TransactionStatus.REJECTED ? '取引が不成立になりました' : ''}
                                        { transaction.status === TransactionStatus.RESPONDING ? '商談が開始されました。' : ''}
                                    </span>
                                </div>

                                <div className="text-center text-[12px] mb-12">
                                    { transaction.status === TransactionStatus.COMPLETE ? '報酬を確認し、期間内に振込申請を行ってください。' : ''}
                                    { transaction.status === TransactionStatus.ACCEPTED ? '報酬額が確定しました。現在入金待ちです。' : ''}
                                </div>

                                <div className="w-full max-w-[86%] mx-auto mb-12">
                                    <StepBar step={transaction.status} />
                                </div>

                                <div className="flex flex-col gap-2 bg-gray-200 px-[5%]  py-4 md:py-[3%] text-[12px] mb-6">
                                    <div>※商談により取引は中断・中止となる場合があります。</div>
                                    <div>※取引完了目案日は変更される場合があります。</div>
                                    <div>※基本紹介料が%で表示されている案件は取引完了後に金額が確定します。</div>
                                </div>

                                { transaction.stutus == TransactionStatus.COMPLETE ? ( 
                                    <Link className="border-t border-b border-gray-200 flex items-center justify-between h-16 mt-16">
                                        <div className="text-[14px]">振込申請について</div>
                                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                                    </Link>
                                ) : (
                                    <div>
                                        <Link className="border-t border-b border-gray-200 flex items-center justify-between h-16 mt-16">
                                            <div className="text-[14px]">ステータスが進まない</div>
                                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                                        </Link>
                                        <Link className="border-b border-gray-200 flex items-center justify-between h-16 mb-12">
                                            <div className="text-[14px]">取引完了目案日を過ぎても完了しない</div>
                                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                                        </Link>
                                    </div>
                                )}     

                            </div>
                        </div> 

                        <div className="text-[20px] mb-6">
                            紹介された人の情報
                        </div>

                        <div className="bg-white shadow-md rounded-md pt-[6%] pb-[4%] mb-6 ">
                            <div className="w-[92%] max-w-[700px] mx-auto">

                                <div className="flex items-center text-[12px] space-x-4 w-full mb-4">
                                    <div className="flex items-center space-x-2 w-28">紹介取次コード</div>
                                    <div className="">{ transaction.agency_code }</div>
                                </div>
                                
                                <div className="flex items-center text-[12px] space-x-4 mb-4">
                                    <div className="block w-28">
                                        紹介日
                                    </div>
                                    <div className="grow">{ formatDate1(transaction?.created_at) }</div>
                                </div>

                                <div className="sm:flex text-[12px] sm:space-x-4 mb-6">
                                    <div className="block w-28 mb-2 sm:mb-0">
                                        取次メモ
                                    </div>
                                    <div className="grow">
                                        <textarea 
                                            disabled
                                            value={transaction?.target_memo ?? ''}
                                            className="w-full p-4 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[12px]" 
                                            rows="2" 
                                            placeholder="紹介フォームのメモ欄に入力した内容が自動反映" 
                                        >                                        
                                        </textarea>
                                    </div>
                                </div>
                                    
                                <div className="flex flex-col gap-2 bg-gray-200 px-[5%] py-4 md:py-[3%] text-[12px] mb-6">
                                    <div>※JOBSCAPEは個人情報保護の観点から、ご紹介いただいた方の個人情報を保持しておりません。</div>
                                    <div>ご確認の際はお手数ですが、紹介取次ゴード、ご紹介日のメール内容、また上記の取次メモを元にご自身で参照ください。</div>
                                </div>

                            </div>
                        </div> 
                    </div>
                </div>
            </div>   
        </UserAuthLayout>
    );
}
