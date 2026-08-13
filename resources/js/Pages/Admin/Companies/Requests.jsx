import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import AcceptModal from '@/Components/Admin/AcceptModal';

export default function Index({
    users
}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
    const [isAcceptSelected, setIsAcceptSelected] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const toggleAcceptModal = (index, user, type) => {
        setIsOpenAcceptModal(prevState => !prevState);
        setIsAcceptSelected(index);
        setSelectedType(type);
        setSelectedUser(user);
    }

    const params = new URLSearchParams(location.search);
    const { data, setData, get, processing, errors, reset } = useForm({
        keyword: params.get('keyword') ?? '',
    });

    const handleSetData = (key, value) => {
        console.log(key)
        setData({
            ...data,
            [key]: value
        });
    }

    const submit = () => {
        get(route('admin.companies.requested'), {
            onFinish: () => {

            },
        });
    }
    
    const acceptForm = useForm();

    const acceptCompany = () => {
        acceptForm.post(route('admin.companies.accept', [selectedUser.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }    

    const rejectCompany = () => {
        acceptForm.post(route('admin.companies.reject', [selectedUser.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">企業一覧</h3>
                </div>
                <div className="px-[4%] py-4 flex items-center gap-4">
                    <div className="flex items-center justify-start gap-2">
                        <div className="text-[14px]">キーワード</div>
                        <div className="relative text-[14px] max-w-[500px]">
                            <TextInput
                                type="text"
                                name="keyword"
                                value={data.keyword}
                                className="mt-1 block w-full pr-8"
                                placeholder="名前やメールで検索"
                                onChange={(e) => handleSetData('keyword', e.target.value)}
                            />
                            <InputError message={errors.business_name} className="mt-2" />
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-75"
                        onClick={submit}
                    >
                        検索
                    </button>
                </div>
                <div className="w-[92%] mx-auto mt-4 mb-6">
                    {users.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">画像</th>
                                <th className="border text-left px-4 py-2">企業名</th>
                                <th className="border text-left px-4 py-2">メール</th>
                                <th className="border text-left px-4 py-2">電話番号</th>
                                <th className="border text-left px-4 py-2">Webサイトリンク</th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(users.current_page - 1) * users.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">
                                            <img src={user.avatar_url} alt="withholding" className="min-w-16 h-16 rounded-md object-cover" />
                                        </td>
                                        <td className="border px-4 py-2">{ user.company?.coporate_name }</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.company?.phone_number}</td>
                                        <td className="border px-4 py-2">
                                            <a href={user.company?.site_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{user.company?.site_url}</a>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.companies.show', [user.id])} className="text-blue-500 hover:text-blue-700">詳細</Link>
                                            <button onClick={() => toggleAcceptModal((users.current_page - 1) * users.per_page + index + 1, user, '許可') } className="ml-2 text-cyan-500 hover:text-blue-700">許可</button>
                                            <button onClick={() => toggleAcceptModal((users.current_page - 1) * users.per_page + index + 1, user, '不許') } className="ml-2 text-red-500 hover:text-blue-700">不許</button>
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
            <AdminPageNavs items={users} />
            <AcceptModal data={isAcceptSelected} type={selectedType} isOpen={isOpenAcceptModal} onClose={toggleAcceptModal} onSubmit={selectedType == '許可' ? acceptCompany : rejectCompany} />
        </AdminAuthLayout>
    );
}
