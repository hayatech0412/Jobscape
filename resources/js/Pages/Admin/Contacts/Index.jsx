import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import { formatDate } from '@/Plugins/helper';

export default function Index({
    contacts
}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteSelected, setIsDeleteSelected] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const toggleModal = (index, contact) => {
        setIsOpenDeleteModal(prevState => !prevState);
        setIsDeleteSelected(index);
        setSelectedContact(contact);
    };

    const params = new URLSearchParams(location.search);
    const { data, setData, get, processing, errors, reset } = useForm({
        keyword: params.get('keyword') ?? '',
    });

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const submit = () => {
        get(route('admin.contacts'), {
            onFinish: () => {

            },
        });
    }

    const deleteForm = useForm();

    const deletecontact = () => {
        deleteForm.post(route('admin.contacts.delete', [selectedContact.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">お問い合わせ一覧</h3>
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
                    {contacts.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">タイトル</th>
                                <th className="border text-left px-4 py-2">送付日時</th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.data.map((contact, index) => (
                                    <tr key={contact.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(contacts.current_page - 1) * contacts.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">{ contact.title }</td>
                                        <td className="border px-4 py-2">{ formatDate(contact.created_at) }</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.contacts.show', [contact.id])} className="text-blue-500 hover:text-blue-700">詳細</Link>
                                            <button onClick={() => toggleModal((contacts.current_page - 1) * contacts.per_page + index + 1, contact) } className="ml-2 text-red-500 hover:text-blue-700">削除</button>
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
            <AdminPageNavs items={contacts} />
            <DeleteModal data={isDeleteSelected} isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deletecontact} />
        </AdminAuthLayout>
    );
}
