import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import { formatDate } from '@/Plugins/helper';

export default function Index({
    opinions,
    use_types
}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteSelected, setIsDeleteSelected] = useState(null);
    const [selectedOpinion, setselectedOpinion] = useState(null);
    const toggleModal = (index, Opinion) => {
        setIsOpenDeleteModal(prevState => !prevState);
        setIsDeleteSelected(index);
        setselectedOpinion(Opinion);
    };

    
    const useTypeOptions = [
        {key: null, value: 9, label: 'すべて'},
        ...use_types.map(use_type => ({ key: use_type.key, value: use_type.value, label: use_type.label }))
    ];
    
    const params = new URLSearchParams(location.search);
    const { data, setData, get, processing, errors, reset } = useForm({
        keyword: params.get('keyword') ?? '',
        use_type: params.get('use_type') ?? '',
    });

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const submit = () => {
        get(route('admin.opinions'), {
            onFinish: () => {

            },
        });
    }

    const deleteForm = useForm();

    const deleteOpinion = () => {
        deleteForm.post(route('admin.opinions.delete', [selectedOpinion.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">意見箱</h3>
                </div>
                <div className="px-[4%] py-4 flex items-center gap-4">
                    <div className="flex flex-col ">
                        <div className="text-[12px]">ステータス</div>
                        <div className="relative text-[14px]">
                            <CustomSelect
                                id="cor1"
                                className="mt-1 w-[150px]"
                                currentOption={data.use_type}
                                options={useTypeOptions}
                                onSelect={ (value) => { handleSetData('use_type', value) } }
                            />
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
                <div className="w-[92%] mx-auto mt-4 mb-6">
                    {opinions.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">ニックネーム</th>
                                <th className="border text-left px-4 py-2">タイトル</th>
                                <th className="border text-left px-4 py-2">利用範囲</th>
                                <th className="border text-left px-4 py-2">作成日時</th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                {opinions.data.map((opinion, index) => (
                                    <tr key={opinion.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(opinions.current_page - 1) * opinions.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">{ opinion.nickname }</td>                                        
                                        <td className="border px-4 py-2">{ opinion.title }</td>
                                        <td className="border px-4 py-2">{ opinion.use_type_label }</td>
                                        <td className="border px-4 py-2">{ formatDate(opinion.updated_at) }</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.opinions.show', [opinion.id])} className="text-blue-500 hover:text-blue-700">詳細</Link>
                                            <button onClick={() => toggleModal((opinions.current_page - 1) * opinions.per_page + index + 1, opinion) } className="ml-2 text-red-500 hover:text-blue-700">削除</button>
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
            <AdminPageNavs items={opinions} />
            <DeleteModal data={isDeleteSelected} isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteOpinion} />
        </AdminAuthLayout>
    );
}
