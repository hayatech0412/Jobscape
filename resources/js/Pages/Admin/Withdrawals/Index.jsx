import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import BlockModal from '@/Components/Admin/BlockModal';
import CustomSelect from '@/Components/CustomSelect';
import DateRangePicker from '@/Components/DateRangePicker';
import CustomDateRangePicker from '@/Components/Admin/CustomDateRangePicker';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import AcceptModal from '@/Components/Admin/AcceptModal';
import UserFilterInput from '@/Components/Admin/UserFilterInput';
import { formatNumber } from '@/Plugins/helper';
import dayjs from "dayjs";

export default function Index({
    withdrawals,
    statuses,
    selectedUser,
}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteSelected, setIsDeleteSelected] = useState(null);
    const [selectedWithdrawal, setselectedWithdrawal] = useState(null);
    const toggleModal = (index, withdrawal) => {
        setIsOpenDeleteModal(prevState => !prevState);
        setIsDeleteSelected(index);
        setselectedWithdrawal(withdrawal);
    };
    
    const [isOpenBlockModal, setIsOpenBlockModal] = useState(false);
    const [isBlockSelected, setIsBlockSelected] = useState(null);
    const [selectedBlockwithdrawal, setSelectedBlockwithdrawal] = useState(null);
    const toggleBlockModal = (index, withdrawal) => {
        setIsOpenBlockModal(prevState => !prevState);
        setIsBlockSelected(index);
        setSelectedBlockwithdrawal(withdrawal);
    }

    const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
    const [isAcceptSelected, setIsAcceptSelected] = useState(null);
    const [selectedAcceptWithdrawal, setSelectedAcceptWithdrawal] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const toggleAcceptModal = (index, product, type) => {
        setIsOpenAcceptModal(prevState => !prevState);
        setIsAcceptSelected(index);
        setSelectedType(type);
        setSelectedAcceptWithdrawal(product);
    }

    const params = new URLSearchParams(location.search);
    const { data, setData, get, processing, errors, reset } = useForm({
        user: params.get('user') ?? '',
        status: params.get('status') ?? 9,
        from: params.get('from') ?? '',
        to: params.get('to') ?? '',
    });

    const statusOptions = [
        {key: null, value: 9, label: 'すべて'},
        ...statuses.map(status => ({ key: status.key, value: status.value, label: status.label }))
    ];

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const submit = () => {
        get(route('admin.withdrawals'), {
            onFinish: () => {
            },
        });
    }

    const deleteForm = useForm();

    const deleteWithdrawal = () => {
        deleteForm.post(route('admin.withdrawals.delete', [selectedWithdrawal.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }

    const handleDateChange = (range) => {
        setData({
            ...data, 
            from: dayjs(range.startDate).format("YYYY-MM-DD"), 
            to: dayjs(range.endDate).format("YYYY-MM-DD")
        });
    };


    const acceptForm = useForm();

    const accept = () => {
        acceptForm.post(route('admin.withdrawals.accept', [selectedAcceptWithdrawal.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }    

    const reject = () => {
        acceptForm.post(route('admin.withdrawals.reject', [selectedAcceptWithdrawal.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }    

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">振り込み申請一覧</h3>
                </div>
                <div className="px-[4%] py-4 flex items-center gap-4">
                    <div className="flex flex-col ">
                        <div className="text-[12px]">ユーザー</div>                        
                        <div className="relative text-[14px]">
                            <UserFilterInput 
                                has="withdrawals"
                                currentOption={selectedUser ? selectedUser : null}
                                onSelect={(value) => handleSetData('user', value)}
                                onCancel={() => handleSetData('user', '')} />
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="text-[12px]">ステータス</div>
                        <div className="relative text-[14px]">
                            <CustomSelect
                                id="cor1"
                                className="mt-1 w-[150px]"
                                currentOption={data.status}
                                options={statusOptions}
                                onSelect={ (value) => { handleSetData('status', value) } }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="text-[12px] mb-1">期間</div>
                        <div className="relative text-[14px]">
                            <CustomDateRangePicker  
                                start={data.from}
                                end={data.to}
                                onChange={handleDateChange} />
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="text-[12px] min-h-6"></div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-75"
                            onClick={submit}
                        >
                            検索
                        </button>
                    </div>
                    <div className="flex flex-col ">
                        <div className="text-[12px] min-h-6"></div>
                        <a
                            href={route('admin.export.withDrawls', data)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-75"
                        >
                            CSVダウンロード
                        </a>
                    </div> 
                </div>
                <div className="w-[92%] mx-auto mt-4">
                    {withdrawals.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">ユーザー</th>
                                <th className="border text-left px-4 py-2">残高</th>
                                <th className="border text-left px-4 py-2">振込申請金額</th>
                                <th className="border text-left px-4 py-2">振込手数料</th>
                                <th className="border text-left px-4 py-2">振込金額</th>
                                <th className="border text-left px-4 py-2">ステータス</th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                { withdrawals.data.map((withdrawal, index) => (
                                    <tr key={withdrawal.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(withdrawals.current_page - 1) * withdrawals.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.users.show', [withdrawal.user.id])} className="underline text-blue-500" >
                                                { withdrawal.user?.profile?.last_name } { withdrawal.user?.profile?.first_name }
                                            </Link>
                                        </td>
                                        <td className="border px-4 py-2">¥{ formatNumber(withdrawal.user?.profile?.amount) }</td>
                                        <td className="border px-4 py-2">¥{ formatNumber(withdrawal.request_amount) }</td>
                                        <td className="border px-4 py-2">¥{ formatNumber(withdrawal.amount_fee) }</td>
                                        <td className="border px-4 py-2">¥{ formatNumber(withdrawal.amount) }</td>
                                        <td className="border px-4 py-2">{ withdrawal.status_label }</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.withdrawals.show', [withdrawal.id])} className="text-blue-500 hover:text-blue-700">詳細</Link>
                                            {
                                                withdrawal.status == 0 && <button onClick={() => toggleAcceptModal((withdrawals.current_page - 1) * withdrawals.per_page + index + 1, withdrawal, '許可') } className="ml-2 text-cyan-500 hover:text-blue-700">許可</button>
                                            }
                                            {
                                                withdrawal.status == 0 && <button onClick={() => toggleAcceptModal((withdrawals.current_page - 1) * withdrawals.per_page + index + 1, withdrawal, '不許') } className="ml-2 hover:text-blue-700">不許</button>                                                                                               
                                            }
                                            <button onClick={() => toggleModal((withdrawal.current_page - 1) * withdrawals.per_page + index + 1, withdrawal) } className="ml-2 text-red-500 hover:text-blue-700">削除</button>
                                        </td>                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-[16px] py-4">データがありません。</div>
                    )}
                </div>
            </div>
            <AdminPageNavs items={withdrawals} />
            <DeleteModal data={isDeleteSelected} isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteWithdrawal} />
            <AcceptModal data={isAcceptSelected} type={selectedType} isOpen={isOpenAcceptModal} onClose={toggleAcceptModal} onSubmit={selectedType == '許可' ? accept : reject} />
        </AdminAuthLayout>
    );
}
