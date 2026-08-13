import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import CustomSelect from '@/Components/CustomSelect';
import DeleteModal from '@/Components/Admin/DeleteModal';
import { Head, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import { formatNumber } from '@/Plugins/helper';
import dayjs from 'dayjs';

export default function Index({
    withholdings,
}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteSelected, setIsDeleteSelected] = useState(null);
    const [selectedWithholding, setSelectedWithholding] = useState(null);
    const toggleModal = (index, withholding) => {
        setIsOpenDeleteModal(prevState => !prevState);
        setIsDeleteSelected(index);
        setSelectedWithholding(withholding);
    };
    const deleteForm = useForm();
    const deletewithholding = () => {
        deleteForm.post(route('admin.withholdings.delete', [selectedWithholding.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }

    const currentYear = new Date().getFullYear();
    const year_options = Array.from({ length: 100 }, (_, i) => ({
        value: currentYear - i,
        label: currentYear - i,
    }));

    const month_options = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: String(i + 1).padStart(2, '0'),
    }));

    const currentDate = new Date();
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const prevMonthYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth() + 1;

    const params = new URLSearchParams(location.search);
    const { data, setData, get, processing, errors, reset } = useForm({
        year: params.get('year') ?? prevMonthYear,
        month: params.get('month') ?? prevMonth,
    });

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const submit = () => {
        get(route('admin.withholdings'), {
            onFinish: () => {
            },
        });
    }

    function formatDate(dateString) {
        return dayjs(dateString).format("YYYY年MM月");
    }

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">源泉徴収税管理</h3>
                </div>
                <div className="px-[4%] py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <div className="text-[12px]">対象月</div>                        
                            <div className="flex w-[200px] items-center gap-2 text-[14px]">                            
                                <CustomSelect first=" " currentOption={data.year} className="w-full" options={year_options} onSelect={(value) => { handleSetData('year', value) }} />
                                <CustomSelect first=" " currentOption={data.month} className="w-full" options={month_options} onSelect={(value) => { handleSetData('month', value) }} />
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
                    <div className="flex flex-col ">
                        <div className="text-[12px] min-h-6"></div>
                        <a
                            href={route('admin.export.withholdings')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-75"
                        >
                            CSVダウンロード
                        </a>
                    </div>    
                </div>
                <div className="w-[92%] mx-auto mt-4">
                    {withholdings.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">画像</th>
                                <th className="border text-left px-4 py-2">名前</th>
                                <th className="border text-left px-4 py-2">取得金</th>
                                <th className="border text-left px-4 py-2">源泉徴収税</th>
                                <th className="border text-left px-4 py-2">対象月</th>
                                <th className="border text-left px-4 py-2">ステータス</th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                { withholdings.data.map((withholding, index) => (
                                    <tr key={withholding.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(withholdings.current_page - 1) * withholdings.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">
                                            <img 
                                                src={withholding.user.avatar_url}
                                                alt="withholding"
                                                className="min-w-16 h-16 rounded-md object-cover" />
                                        </td>
                                        <td className="border px-4 py-2">{ withholding.user.nickname ?? withholding.user.profile.last_name + " " + withholding.user.profile.first_name }</td>
                                        <td className="border px-4 py-2">{ formatNumber(withholding.total_earnings) }円</td>
                                        <td className="border px-4 py-2">{ formatNumber(withholding.tax_amount) }円</td>
                                        <td className="border px-4 py-2">{ formatDate(withholding.tax_period) }</td>
                                        <td className="border px-4 py-2">{ withholding.status_label }</td>
                                        <td className="border px-4 py-2">
                                            {/* <Link href={route('admin.withholdings.show', [withholding.id])} className="text-blue-500 hover:text-blue-700">詳細</Link> */}
                                            <button onClick={() => toggleModal((withholdings.current_page - 1) * withholdings.per_page + index + 1, withholding) } className="ml-2 text-red-500 hover:text-blue-700">削除</button>
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
            <AdminPageNavs items={withholdings} />
            <DeleteModal data={isDeleteSelected} isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deletewithholding} />
        </AdminAuthLayout>
    );
}
