import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Show({
    notice,
}) {
    const {auth} = usePage().props;
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // submit data
    const { data, setData, post, processing, errors, reset } = useForm({
        id: notice.id ?? 0,
        title: notice.title ?? '',
        content: notice.content ?? '',
    });

    const submit = () => {
        post(route('admin.notices.store'), {
            onFinish: () => {

            },
        });
    }

    const handleSetData = (key, value) => {
        setData({...data, [key]: value});
    }

    return (
        <AdminAuthLayout>
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%] mb-[6%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-8 font-bold">お知らせ</div>

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
                                            rows="8"
                                            value={data.content}
                                            onChange={(e) => handleSetData('content', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.content} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center ga-8 mt-12">
                            <PrimaryButton 
                                onClick={submit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80 w-40" 
                            >
                                保存
                            </PrimaryButton>
                            <Link 
                                href={route('admin.notices')}
                                className="text-center w-40 h-[50px] ms-4 border-[#3370ff] rounded-full border flex items-center justify-center text-[#3370ff] hover:opacity-80 focus:opacity-80" 
                            >
                                キャンセル
                            </Link>
                        </div>
                    </div>

                </div>
                
            </div>
        </AdminAuthLayout>
    );
}
