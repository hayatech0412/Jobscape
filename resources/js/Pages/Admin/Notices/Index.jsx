import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import { formatDate } from '@/Plugins/helper';

export default function Index({
    notices
}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteSelected, setIsDeleteSelected] = useState(null);
    const [selectedNotice, setselectedNotice] = useState(null);
    const toggleModal = (index, notice) => {
        setIsOpenDeleteModal(prevState => !prevState);
        setIsDeleteSelected(index);
        setselectedNotice(notice);
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
        get(route('admin.notices'), {
            onFinish: () => {

            },
        });
    }

    const deleteForm = useForm();

    const deleteNotice = () => {
        deleteForm.post(route('admin.notices.delete', [selectedNotice.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">お知らせ一覧</h3>
                </div>
                <div className="flex items-center justify-between w-[92%] mx-auto">
                    <div className=" py-4 flex items-center gap-4">
                        <div className="flex items-center justify-start gap-2">
                            <div className="text-[14px]">キーワード</div>
                            <div className="relative text-[14px] max-w-[500px]">
                                <TextInput
                                    type="text"
                                    name="keyword"
                                    value={data.keyword}
                                    className="mt-1 block w-full pr-8"
                                    placeholder=""
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
                    <Link href={route('admin.notices.create')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-75">
                        追加
                    </Link>
                </div>
                <div className="w-[92%] mx-auto mt-4 mb-6">
                    {notices.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">タイトル</th>
                                <th className="border text-left px-4 py-2">内容</th>
                                <th className="border text-left px-4 py-2">作成日時</th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notices.data.map((notice, index) => (
                                    <tr key={notice.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(notices.current_page - 1) * notices.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">{ notice.title }</td>
                                        <td className="border px-4 py-2">{notice.content}</td>                                        
                                        <td className="border px-4 py-2">{formatDate(notice.updated_at)}</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.notices.show', [notice.id])} className="text-blue-500 hover:text-blue-700">編集</Link>
                                            <button onClick={() => toggleModal((notices.current_page - 1) * notices.per_page + index + 1, notice) } className="ml-2 text-red-500 hover:text-blue-700">削除</button>
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
            <AdminPageNavs items={notices} />
            <DeleteModal data={isDeleteSelected} isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteNotice} />
        </AdminAuthLayout>
    );
}
