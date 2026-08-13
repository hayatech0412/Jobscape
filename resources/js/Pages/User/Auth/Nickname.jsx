import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import BackButton from '@/Components/BackButton';
import "react-phone-input-2/lib/style.css"; // 必須: スタイルの読み込み
import PhoneInput from "react-phone-input-2";
import { Head, Link, useForm } from '@inertiajs/react';

export default function Nickname({
    profile
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nickname: profile.nickname ?? "",
    });
  
    const submit = (e) => {
        e.preventDefault();

        post(route('register.nickname.store'), {
            onFinish: () => {},
        });
    };

    return (
        <GuestLayout>          
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.payment.methods')} className="w-6 h-6 my-6"></BackButton>
            </div>  

            <form onSubmit={submit} className="w-[92%] max-w-[1024px] mx-auto mb-20 md:mb-20 bg-white">
                <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                    <div className="text-[20px] mb-8">JOBSCAPEへようこそ！</div>
                    <p className="text-[12px]">アカウントが作成されました。</p>
                    <p className="text-[12px] mb-12">詳細は、******@jobscape.com宛にメールを送信しております。</p>

                    <div className="text-[16px] mb-4">ニックネームを登録する</div>
                    <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-6 ">
                        <div className="mb-4">
                            <InputLabel className="mb-2"  value="ニックネーム" />                            
                            <TextInput
                                type="text"
                                name="nickname"
                                value={data.nickname}
                                className="mt-1 block w-full"
                                placeholder="ニックネームを入力してください"
                                onChange={(e) => setData({...data, nickname: e.target.value})}
                            />
                            <InputError message={errors.nickname} className="mt-2" />
                        </div>
                        <div className="text-[12px]">
                            <div className="mb-1">※JOBSCAPE内で使用するニックネームを登録してください。</div>
                            <div className="">※取引する企業へ表示されます。</div>
                        </div>
                    </div>                   

                    <div className="text-center mt-10">
                        <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                            登録する
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
