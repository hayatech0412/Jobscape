import React, { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import BackButton from '@/Components/BackButton';
import ArrowRightTop from '@/Components/Icons/ArrowRightTop';
import ArrowRight from '@/Components/Icons/ArrowRight';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { showError } from '@/Plugins/helper';
import { Toast } from 'primereact/toast';

export default function PhoneNumberVerify({
    profile,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        phone_number: "",
        form_number: "",
        sms_verify_code: "",
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
                ...data,
                form_number: value,
                phone_number: `0${phone_number}`
            });
        }
    };

    const verify = (e) => {
        e.preventDefault();

        post(route('register.phone.number.verify.send'), {
            onFinish: () => {
                
            },
        });
    };

    const returnBack = (e) => {
        Inertia.get(route('register.phone.number'))
    }

    return (
        <GuestLayout>       
            <Toast ref={toast} />              
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.phone.number')} className="w-6 h-6 my-6"></BackButton>
            </div>

            <div className="w-[92%] max-w-[1024px] mx-auto mb-20 md:mb-20 bg-white">
                <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                    <form onSubmit={verify}>
                        <div className="text-[20px] mb-8">認証番号の入力</div>
                        <p className="text-[12px] mb-1">{profile.phone_number}へ認証コードをお送りしました。</p>
                        <p className="text-[12px] mb-8">下記へ入力し、次へお進みください。</p>

                        <div className="border border-gray-200 rounded-md px-[6%] py-[4%] mb-6 ">
                            <div className="rounded-md bg-[#f5f9fc] p-[4%]">
                                <div className="mb-4 ">
                                    <InputLabel className="mb-2" htmlFor="sms_verify_code" value="認証番号" />

                                    <TextInput
                                        type="text"
                                        name="sms_verify_code"
                                        value={data.sms_verify_code}
                                        className="mt-1 block w-full"
                                        placeholder="6桁の認証番号"
                                        isFocused={true}
                                        onChange={(e) => setData({...data, sms_verify_code: e.target.value})}
                                    />
                                    <InputError message={errors.sms_verify_code} className="mt-2" />
                                </div>
                            </div>
                        </div>    
                        
                        <div className="text-center mt-8 mb-12">
                            <PrimaryButton onClick={verify} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                                認証する
                            </PrimaryButton>
                        </div>
                    </form>
                    
                    <div className="text-[20px] mb-8">SMSを受信できない場合</div>
                    <p className="text-[12px] mb-4">自身の番号からSMS送信し、認証できます。</p>

                    <div className="flex justify-center text-center mb-8">
                        <button onClick={returnBack} className="max-w-[250px] border-2 border-[#3370ff] text-[#3370ff] hover:bg-[#3370ff] hover:text-white h-12 rounded-full w-full flex justify-center items-center text-[12px]">
                            番号を入力する
                        </button>
                    </div>
                    <div className="flex flex-col items-end mb-12 leading-none">
                        <Link className="text-[#3370ff] font-normal text-[12px] flex">自身の番号からSMS送くり、認証する方法<ArrowRightTop className="size-3" ></ArrowRightTop></Link><br />
                        <Link className="text-[#3370ff] font-normal text-[12px] flex">電話をかけて番号を聞く方法<ArrowRightTop className="size-3" ></ArrowRightTop></Link>
                    </div>

                    <p className="text-[12px] mb-4">認証番号を再送することもできます。もう一度電話番号を入力してください。</p>
                    <form onSubmit={submit}>
                        <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-6 ">
                            <div className="mb-4">
                                <InputLabel className="mb-2" value="電話番号認証" />

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
                                <InputError message={errors.phone_number} className="mt-2" />
                            </div>
                        </div>                   

                        <div className="text-center mt-10">
                            <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                                送信する
                            </PrimaryButton>
                        </div>
                    </form>

                    <Link className="border-t border-b mt-24 border-gray-200 flex items-center justify-between h-16 mb-12">
                        <div className="text-[14px]">認証番号が受け取れない場合はこちら</div>
                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
