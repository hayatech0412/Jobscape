import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import AcceptModal from '@/Components/Admin/AcceptModal';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { formatDate } from '@/Plugins/helper';

export default function Show({
    withdrawal,
}) {
    const {auth} = usePage().props;    
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const toggleModal = () => {
        setIsOpenDeleteModal(prevState => !prevState);
    };
    const deleteForm = useForm();    
    const deleteWithdrawal = () => {
        deleteForm.post(route('admin.withdrawals.delete', [withdrawal?.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }
    
    const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const toggleAcceptModal = (type) => {
        setIsOpenAcceptModal(prevState => !prevState);
        setSelectedType(type);
    }


    const actionForm = useForm();
    const accept = () => {
        console.log('accept')
        actionForm.post(route('admin.withdrawals.accept', [withdrawal.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }

    const reject = () => {
        console.log('reject')

        actionForm.post(route('admin.withdrawals.reject', [withdrawal.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout>
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%] mb-[6%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-8 font-bold">振り込み申請</div>

                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px]">ユーザー</div>
                                <div className="relative text-[14px] w-[75%]">
                                    <Link href={route('admin.users.show', [withdrawal.user.id])} className="underline text-blue-500" >
                                        {withdrawal?.user.profile.last_name} {withdrawal?.user.profile.first_name}({withdrawal?.user.profile.nickname})
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px]">残高</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.user.profile.amount}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px]">振込申請金額</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.request_amount}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">振込手数料</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.amount_fee}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">振込金額</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.amount}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">銀行</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.bank_name}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">口座種別</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.account_type}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">支店コード</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.shop_code}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">口座番号</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.account_code}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">状態</div>
                                <div className="relative text-[14px] w-[75%]">
                                    {withdrawal?.status_label}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">承認日時</div>
                                <div className="relative text-[14px] w-[75%]">
                                    { withdrawal.withdraw_at ? formatDate(withdrawal.withdraw_at) : '' }
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <div className="text-[14px] mb-1">作成日時</div>
                                <div className="relative text-[14px] w-[75%]">
                                    { formatDate(withdrawal?.created_at) }
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-12">
                            {
                                withdrawal.status == 0 && 
                                <button 
                                    onClick={() => toggleAcceptModal('許可') } 
                                    className="text-center w-32 h-[50px] text-white rounded-full bg-cyan-500 hover:opacity-80 focus:opacity-80"
                                >
                                    許可
                                </button>
                            }
                            {
                                withdrawal.status == 0 && 
                                <button 
                                    onClick={() => toggleAcceptModal('不許') }
                                    className="text-center w-32 h-[50px] text-white rounded-full bg-gray-700 hover:opacity-80 focus:opacity-80" 
                                >
                                    不許
                                </button>
                            }
                            <button 
                                onClick={toggleModal}
                                className="text-center w-32 h-[50px] text-white rounded-full bg-red-500 hover:opacity-80 focus:opacity-80" 
                            >
                                削除
                            </button>
                            <button
                                onClick={() => {history.back()}}
                                className="text-center w-32 h-[50px] border-[#3370ff] rounded-full border flex items-center justify-center text-[#3370ff] hover:opacity-80 focus:opacity-80" 
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>

                </div>
                
            </div>

            <AcceptModal type={selectedType} isOpen={isOpenAcceptModal} onClose={toggleAcceptModal} onSubmit={selectedType == '許可' ? accept : reject} />
            <DeleteModal isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteWithdrawal} />
        </AdminAuthLayout>
    );
}
