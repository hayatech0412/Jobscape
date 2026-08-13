import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import CustomSelect from '@/Components/CustomSelect';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import DeleteModal from '@/Components/Admin/DeleteModal';
import UserFilterInput from '@/Components/Admin/UserFilterInput';
import { Head, Link, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import { formatNumber } from '@/Plugins/helper';

export default function Index({
    transactions,
    companies,
    statuses,
    selectedUser,
    sort_by, 
    sort_direction
}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteSelected, setIsDeleteSelected] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const toggleModal = (index, transaction) => {
        setIsOpenDeleteModal(prevState => !prevState);
        setIsDeleteSelected(index);
        setSelectedTransaction(transaction);
    };
    const deleteForm = useForm();
    const deleteTransaction = () => {
        deleteForm.post(route('admin.transactions.delete', [selectedTransaction.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }

    const statusOptions = [
        {key: null, value: 9, label: 'すべて'},
        ...statuses.map(status => ({ key: status.key, value: status.value, label: status.label }))
    ];

    const companyOptions = [
        {id: 0, coporate_name: 'すべて'},
        ...companies
    ];

    const params = new URLSearchParams(location.search);
    const { data, setData, get, processing, errors, reset } = useForm({
        keyword: params.get('keyword') ?? '',
        status: params.get('status') ?? 9,
        company: params.get('company') ?? '',
        user: params.get('user') ?? '',
        sort_by: sort_by ?? '',
        sort_direction: sort_direction ?? '',
    });

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const submit = () => {
        get(route('admin.transactions'), {
            onFinish: () => {
            },
        });
    }

    const handleSort = (column) => {
        const newDirection = sort_by === column && sort_direction === 'asc' ? 'desc' : 'asc';
        data.sort_by = column;
        data.sort_direction = newDirection;
        get(route('admin.transactions'), {
            onFinish: () => {
            },
        });
    };

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">取引一覧</h3>
                </div>
                <div className="px-[4%] py-4 flex items-center gap-4">
                    <div className="flex flex-col ">
                        <div className="text-[12px]">企業</div>                        
                        <div className="relative text-[14px]">
                            <select
                                value={data.company}
                                onChange={(e) => handleSetData('company', e.target.value)}
                                className={
                                    "w-[200px] mt-1 text-[14px] appearance-none px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                }
                            >   
                                {companyOptions.map((option, index) => (
                                    <option key={option.id + "-" + index} value={option.id}>
                                        {option.coporate_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="text-[12px]">ユーザー</div>                        
                        <div className="relative text-[14px]">
                            <UserFilterInput 
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
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="text-[12px]">キーワード</div>
                        <div className="relative text-[14px] max-w-[500px]">
                            <TextInput
                                type="text"
                                name="keyword"
                                value={data.keyword}
                                className="mt-1 block w-full pr-8"
                                placeholder="名前やメールで検索"
                                onChange={(e) => handleSetData('keyword', e.target.value)}
                            />
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
                </div>
                <div className="w-[92%] mx-auto mt-4">
                    {transactions.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">商材写真</th>
                                <th className="border text-left px-4 py-2">取引ID</th>
                                <th className="border text-left px-4 py-2">商材名</th>
                                <th className="border text-left px-4 py-2">企業</th>
                                <th className="border text-left px-4 py-2">ユーザー</th>
                                <th className="border text-left px-4 py-2">紹介を受ける方</th>
                                <th className="border text-left px-4 py-2">金額</th>
                                <th className="border text-left px-4 py-2">
                                    <button className=" text-blue-500" onClick={() => handleSort('status')}>
                                        ステータス {sort_by === 'status' && (sort_direction === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                { transactions.data.map((transaction, index) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(transactions.current_page - 1) * transactions.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">
                                            <img 
                                                src={transaction.product.main_image}
                                                alt="Transaction"
                                                className="min-w-20 h-16 rounded-md object-cover" />
                                        </td>
                                        <td className="border px-4 py-2">{ transaction.code }</td>
                                        <td className="border px-4 py-2">{ transaction.product.name }</td>
                                        <td className="border px-4 py-2">{ transaction.product.company.coporate_name }</td>
                                        <td className="border px-4 py-2">{ transaction.user.profile?.full_name }</td>
                                        <td className="border px-4 py-2">{ transaction.target_last_name } { transaction.target_first_name }</td>
                                        <td className="border px-4 py-2">{ transaction.total_amount > 0 ? '¥'+formatNumber(transaction.total_amount) : '-' }</td>
                                        <td className="border px-4 py-2">{ transaction.status_label }</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.transactions.show', [transaction.id])} className="text-blue-500 hover:text-blue-700">詳細</Link>
                                            <button onClick={() => toggleModal((transactions.current_page - 1) * transactions.per_page + index + 1, transaction) } className="ml-2 text-red-500 hover:text-blue-700">削除</button>
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
            <AdminPageNavs items={transactions} />
            <DeleteModal data={isDeleteSelected} isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteTransaction} />
        </AdminAuthLayout>
    );
}
