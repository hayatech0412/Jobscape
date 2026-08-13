import React, { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import BackButton from '@/Components/BackButton';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import "react-phone-input-2/lib/style.css"; // 必須: スタイルの読み込み
import PhoneInput from "react-phone-input-2";
import { Head, Link, useForm } from '@inertiajs/react';
import { showError } from '@/Plugins/helper';
import { Toast } from 'primereact/toast';


export default function PhoneNumber({
    Profile
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        phone_number: "",
        form_number: "",
    });
    const toast = useRef(null);
  
    const submit = (e) => {
        e.preventDefault();

        // Check if it's a valid Japanese mobile number
        if (!/^0(70|80|90)\d{8}$/.test(data.phone_number)) {
            showError(toast, '有効な携帯電話番号を入力してください');
            return;
        }

        console.log('Sending SMS to:', data.phone_number);

        post(route('register.phone.number.send'), {}, {
            onFinish: () => {},
        });
    };

    const handlePhoneNumberChange = (value) => {
        // Remove any non-numeric characters
        const numericValue = value.replace(/\D/g, '');
        
        if (numericValue.startsWith('81')) {
            const phone_number = numericValue.slice(2); // Remove 81
            setData({ 
                form_number: value,
                phone_number: `0${phone_number}`
            });
        }
    };

    return (
        <GuestLayout>     
            <Toast ref={toast} />             
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.nickname')} className="w-6 h-6 my-6"></BackButton>
            </div>
            
            <form onSubmit={submit} className="w-[92%] max-w-[1024px] mx-auto mb-20 md:mb-20 bg-white">
                <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                    <div className="text-[20px] mb-8">電話番号を登録する</div>

                    <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-6 ">
                        <p className="text-[12px] mb-6 leading-5">
                            ご本人確認、アカウントを復元等必要時に使用されます。<br />
                            SMSを利用して電話番号を確証します。<br />
                            電話番号を入力し、送信された、SMSに表示されている6桁の番号をご入力ください。<br />
                            プラン変更、キャンセルはマイページよりいつでも可能です。
                        </p>
                        <div className="">
                            <InputLabel className="mb-2" htmlFor="code" value="電話番号認証" />

                            <PhoneInput
                                country="jp" // デフォルトの国コードを日本に設定
                                value={data.form_number} // 入力値のバインディング
                                onChange={(value) => handlePhoneNumberChange(value)} // 値の変更時に更新
                                inputProps={{
                                    name: "phone",
                                    required: true,
                                    autoFocus: true,
                                }}
                                containerStyle={{ marginBottom: "10px" }} // コンテナのスタイル
                                inputStyle={{ width: "100%", height: "40px" }} // 入力フィールドのスタイル
                                buttonStyle={{ backgroundColor: "white" }} // フラグボタンのスタイル
                            />
                            <InputError message={errors.phone_number} className="my-2" />
                        </div>
                        <div className="text-[12px]">※日本国内の携帯電話のみ認証が可能です。</div>
                    </div>                   

                    <div className="text-center mt-10">
                        <PrimaryButton className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                            SMSを送信する
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
