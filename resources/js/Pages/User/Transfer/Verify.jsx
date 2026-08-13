import React, { useState, useEffect } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Verify({
    bank_account,
    profile,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
    });

    const submit = (e) => {

        post(route('transfer.verified'), {
            onFinish: () => {
            },
        });
    };    

    return (
        <UserAuthMainLayout>        
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%] px-[4%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="bg-white rounded-lg p-[50px] w-[350px] mx-auto" >
                        <div className="text-center font-semibold text-[18px] mb-6">
                            この操作は<br /><span className="text-[#3370ff]">本人確認</span>が必要です。
                        </div>
                        <img className="w-[60%] mx-auto object-cover mb-6" src={ "/assets/images/m.png"} alt="" />
                        <div className="text-center text-[14px] mb-8 leading-6">
                            お客様の安心・安全のため、<br />マイナンバーカードや運転免許証等<br />での本人確認をお願いしています。
                        </div>
                        <button onClick={submit} className="bg-[#3370ff] h-12 rounded-full w-full flex justify-center items-center text-white text-[14px] mb-4 hover:opacity-80 focus:opacity-80 font-semibold">
                            最短１分で本人確認する
                        </button>
                        <Link href={route('transfer.info.edit')} className="border border-gray-200 h-12 rounded-full w-full flex justify-center items-center text-[14px] hover:opacity-80 focus:opacity-80 font-semibold">
                            戻る
                        </Link>
                    </div>
                </div>
            </div>    
        </UserAuthMainLayout>
    );
}
