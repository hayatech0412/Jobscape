import { useState } from "react";
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import BackButton from '@/Components/BackButton';
import ArrowRight from '@/Components/Icons/ArrowRight';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function EmailVerify({
    user_id
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        verify_token: '',
        user_id: user_id,
    });

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('register.email.verify'), {
            onFinish: () => {}
        });
    };

    const resend = (e) => {
        e.preventDefault();

        post(route('register.email.resend'), {
            onFinish: () => {}
        });
    };

    return (
        <GuestLayout>           
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register')} className="w-6 h-6 my-6"></BackButton>
            </div>

            <div className="w-[92%] max-w-[1024px] mx-auto bg-white mb-40">
                <div className="w-[92%] max-w-[700px] mx-auto ">
                    <form className="pt-20 pb-20" onSubmit={submit}>
                        <div className="text-[20px] mb-4 font-semibold">認証コードの入力</div>

                        <div className="mb-10 text-[12px]"><span className="text-[16px]">******@jobscape.com</span>へ認証コードをお送りしました。</div>
                        <div className="mb-10 text-[12px]">下記へ入力し、確認を行ってください。</div>

                        <div className="border border-gray-200 rounded-md p-[20px] md:px-[40px] md:py-[30px]">
                            <div className="bg-gray-100 w-full">
                                <div className="w-[92%] max-w-[450px] p-[4%] mx-auto">
                                    <InputLabel className="mb-2" value="認証コード" />

                                    <TextInput
                                        type="text"
                                        name="verify_token"
                                        value={data.verify_token}
                                        className="mt-1 block w-full"
                                        placeholder="6桁の認証コード"
                                        onChange={(e) => setData({...data, verify_token: e.target.value})}
                                    />
                                    <InputError message={errors.verify_token} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-10 mt-3 text-[12px] text-[#e24053]">認証コードは発行から10分後に無効になります。</div>

                        <div className="text-center mt-8">
                            <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80">
                                認証する
                            </PrimaryButton>
                        </div>
                        
                        <div className="text-center mt-4">
                            <button onClick={resend} className="text-center h-[50px] rounded-full w-full max-w-[250px] mb-12 border border-[#3370ff] text-[#3370ff] hover:opacity-80 focus:opacity-80">
                                認証コードを再送する
                            </button>
                        </div>

                        <p className="text-[10px] max-w-[550px] w-full mx-auto mb-1">※キャリアメールでは受信できない場合がございます。受信可能なアドレスをご利用ください。</p>
                        <p className="text-[10px] max-w-[550px] w-full mx-auto">※受信設定・迷惑メールをご確認ください。</p>

                        <Link className="border-t border-b mt-24 border-gray-200 flex items-center justify-between h-16">
                            <div className="text-[14px]">認証コードが受け取れない場合はこちら</div>
                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                        </Link>

                    </form>
                </div>
            </div>
            
        </GuestLayout>
    );
}
