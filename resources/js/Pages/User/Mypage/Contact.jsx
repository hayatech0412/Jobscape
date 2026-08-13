import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import UserAuthLayout from '@/Layouts/UserAuthLayout';
import InputError from '@/Components/InputError';
import BackButton from "@/Components/BackButton";
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Contact({

}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
    });

    const handleSetData = (key, value) => {
        setData({...data, [key]: value});
    }

    const submit = () => {
        post(route('contact.store'), {
            onFinish: () => {
                reset();
            },
        });
    }

    return (
        <UserAuthLayout>
            <div className="bg-gradient-to-r from-[#e9f7f7] to-[#f7edd5] min-h-[100vh]">
                <div className="px-[4%] lg:px-8">
                    <BackButton className="w-6 h-6 my-6"></BackButton>
                </div>

                <div className="w-[92%] max-w-[1024px] mx-auto">
                    <div className="w-[92%] mx-auto my-[4%] mb-[200px] px-[4%] py-[50px] bg-white border border-gray-100 rounded-lg shadow-md">
                        <div className=" mx-auto max-w-[650px] p-[50px] w-full" >  
                            <div className="text-[20px] mb-8 font-bold">お問い合わせ</div>

                            <div className="mb-2">
                                <div className="">
                                    <div className="text-[14px]">タイトル</div>
                                    <div className="relative text-[14px] ">
                                        <TextInput
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleSetData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 py-3 ">
                                <div className="">
                                    <div className="text-[14px] mb-1">内容</div>
                                    <div className="relative text-[14px] ">
                                        <div className="relative">
                                            <textarea
                                                className="w-full p-3 pr-6 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[14px]" 
                                                rows="5"
                                                value={data.content}
                                                onChange={(e) => handleSetData('content', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={errors.content} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-12">
                                <PrimaryButton 
                                    onClick={submit}
                                    className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80" 
                                >
                                    送信する
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                </div>                
            </div>
        </UserAuthLayout>
    );
}
