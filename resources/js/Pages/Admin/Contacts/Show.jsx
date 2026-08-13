import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { formatDate } from '@/Plugins/helper';

export default function Show({
    contact,
}) {
    const {auth} = usePage().props;    
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const toggleModal = () => {
        setIsOpenDeleteModal(prevState => !prevState);
    };
    const deleteForm = useForm();    
    const deleteContact = () => {
        deleteForm.post(route('admin.contacts.delete', [contact.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout>
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%] mb-[6%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-8 font-bold">お知らせ内容</div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px]">タイトル</div>
                                <div className="relative text-[14px] w-[75%]">
                                   {contact.title}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">内容</div>
                                <div className="relative text-[14px] w-[75%] whitespace-pre-line ">
                                    {contact.content}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">作成日時</div>
                                <div className="relative text-[14px] w-[75%]">
                                    { formatDate(contact.created_at) }
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center ga-8 mt-12">
                            <button 
                                onClick={toggleModal}
                                className="text-center w-40 h-[50px] text-white rounded-full ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80" 
                            >
                                削除
                            </button>
                            <button
                                onClick={() => {history.back()}}
                                className="text-center w-40 h-[50px] ms-4 border-[#3370ff] rounded-full border flex items-center justify-center text-[#3370ff] hover:opacity-80 focus:opacity-80" 
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>

                </div>
                
            </div>

            <DeleteModal isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteContact} />
        </AdminAuthLayout>
    );
}
