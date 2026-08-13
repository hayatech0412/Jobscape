import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomRadioButtons from '@/Components/CustomRadioButtons';
import InputLabel from '@/Components/InputLabel';
import UserAuthLayout from '@/Layouts/UserAuthLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from "@/Components/BackButton";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Opinion({
    opinion,
    use_types,
}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        nickname: opinion?.nickname ?? '',
        use_type: opinion?.use_type ?? 1,
        use_type_other: opinion?.use_type_other ?? '',
        title: opinion?.title ?? '',
        content: opinion?.content ?? '',
    });

    const handleSetData = (key, value) => {
        setData({...data, [key]: value});
    }

    const submit = (e) => {
        post(route('opinion.store'), {
            onFinish: () => {
                reset();
            },
        });
    };    

    return (
        <UserAuthLayout>
            <div className="bg-gradient-to-r from-[#e9f7f7] to-[#f7edd5] min-h-[100vh]">
                <div className="px-[4%] lg:px-8">
                    <BackButton className="w-6 h-6 my-6"></BackButton>
                </div>

                <div className="w-[92%] max-w-[1024px] mx-auto">
                    <div className="w-[92%] mx-auto my-[4%] mb-[200px] px-[4%] py-[50px] bg-white border border-gray-100 rounded-lg shadow-md">
                        <div className=" mx-auto max-w-[650px] p-[50px] w-full" >  
                            <div className="text-[20px] font-semibold mb-4">ご意見箱</div>
                            <div className="text-[12px] mb-8 leading-6">
                                JOBSCAPEについてのご意見・要望お聞かせください。<br />
                                サービス改善のために活用させていただきます。
                            </div>


                            <div className="mt-10 mb-12">
                                <div className="text-[12px]" >ニックネームまたは氏名</div>
                                <TextInput
                                    type="text"
                                    name="nickname"
                                    value={data.nickname}
                                    className="mt-1 block w-full pr-8"
                                    onChange={(e) => handleSetData('nickname', e.target.value)}
                                />
                                <InputError message={errors.nickname} className="mt-2" />
                            </div>

                            <div className=" mb-2">
                                <InputLabel className="mb-2" htmlFor="use_type" value="JOBSCAPEのご利用" />
                                <div className="">
                                    <CustomRadioButtons 
                                        id="use_type" 
                                        currentOption={data.use_type} 
                                        options={use_types} 
                                        onChange={(value) => {handleSetData('use_type', value)}} />
                                </div>
                                <InputError message={errors.use_type} className="mt-2" />
                            </div>   
                            <div className=" mb-12">
                                <TextInput
                                    type="text"
                                    name="use_type_other"
                                    value={data.use_type_other}
                                    className={"mt-1 block w-full pr-8 " + (data.use_type != 3 ? 'bg-gray-100' : '')}
                                    disabled={data.use_type != 3}
                                    onChange={(e) => handleSetData('use_type_other', e.target.value)}
                                />
                                <InputError message={errors.use_type_other} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                ご意見・ご要望
                            </div>          

                            <div className="mb-4">
                                <div className="text-[12px]" >タイトル</div>
                                <TextInput
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full pr-8"
                                    onChange={(e) => handleSetData('title', e.target.value)}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>     

                            <div className="mb-12 pb-16 border-b border-gray-200">
                                {/* <div className="text-[12px]" >内容</div> */}
                                <div className="relative">
                                    <textarea
                                        className="w-full p-3 pr-6 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[14px]" 
                                        rows="12"
                                        value={data.content}
                                        placeholder="ご意見の内容を入力してください。"
                                        onChange={(e) => handleSetData('content', e.target.value.substring(0, 1000))}
                                    />
                                    <div className="absolute right-2 bottom-3 text-[12px]">/1000</div>
                                </div>
                                <InputError message={errors.content} className="mt-2" />
                            </div>
                            
                            <div className="text-[12px] mb-16 leading-6">
                                ご意見箱にいただいた内容につきましては、原則として返信は行っておりませんので、
                                返信が必要な場合は<Link href={route('contact')} className="text-[#3370ff]">お問い合わせ</Link>をご利用ください。
                            </div>

                            
                            <div className="text-center">
                                <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
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
