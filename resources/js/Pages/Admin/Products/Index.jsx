import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import BlockModal from '@/Components/Admin/BlockModal';
import CustomSelect from '@/Components/CustomSelect';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import AdminProductCard from "@/Components/Admin/AdminProductCard";
import CoporateCode from '@/Pages/Company/Register/CoporateCode';

export default function Index({
    products,
    companies,
}) {
    const statusOptions = [
        {key: null, value: 9, label: 'すべて'},
        {key: 1, value: 3, label: '公開中'},
        {key: 2, value: 4, label: '停止中'},
        {key: 3, value: 6, label: '終了'},
    ];

    const companyOptions = [
        {id: 0, coporate_name: 'すべて'},
        ...companies
    ];

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isDeleteSelected, setIsDeleteSelected] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const toggleModal = (index, product) => {
        setIsOpenDeleteModal(prevState => !prevState);
        setIsDeleteSelected(index);
        setSelectedProduct(product);
    };
    
    const [isOpenBlockModal, setIsOpenBlockModal] = useState(false);
    const [isBlockSelected, setIsBlockSelected] = useState(null);
    const [selectedBlockProduct, setSelectedBlockProduct] = useState(null);
    const toggleBlockModal = (index, product) => {
        setIsOpenBlockModal(prevState => !prevState);
        setIsBlockSelected(index);
        setSelectedBlockProduct(product);
    }

    const params = new URLSearchParams(location.search);
    const { data, setData, get, processing, errors, reset } = useForm({
        keyword: params.get('keyword') ?? '',
        status: params.get('status') ?? 9,
        company: params.get('company') ?? '',
    });

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const submit = () => {
        get(route('admin.products.accepted'), {
            onFinish: () => {
            },
        });
    }

    const deleteForm = useForm();

    const deleteProduct = () => {
        deleteForm.post(route('admin.products.delete', [selectedProduct.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }
    
    const blockProduct = () => {
        deleteForm.post(route('admin.products.block', [selectedBlockProduct.id]), {
            onFinish: () => {
                setIsOpenBlockModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-[24px] pb-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="border-b border-gray-200 px-[4%] py-4">
                    <h3 className=" text-lg font-semibold text-gray-600">商材一覧</h3>
                </div>
                <div className="px-[4%] py-4 flex items-center gap-4">
                    <div className="flex flex-col ">
                        <div className="text-[12px]">企業名</div>                        
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
                            <InputError message={errors.company} className="mt-2" />
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
                            <InputError message={errors.business_name} className="mt-2" />
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
                    {products.data.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border text-left px-4 py-2">No</th>
                                <th className="border text-left px-4 py-2">写真</th>
                                <th className="border text-left px-4 py-2">商材名</th>
                                <th className="border text-left px-4 py-2">企業名</th>
                                <th className="border text-left px-4 py-2">概括</th>
                                <th className="border text-left px-4 py-2">紹介報酬</th>
                                <th className="border text-left px-4 py-2">ステータス</th>
                                <th className="border text-left px-4 py-2">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                { products.data.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{(products.current_page - 1) * products.per_page + index + 1 }</td>
                                        <td className="border px-4 py-2">
                                            <img 
                                                src={product.main_image}
                                                alt="Product"
                                                className="min-w-20 h-16 rounded-md object-cover" />
                                        </td>
                                        <td className="border px-4 py-2">{ product.name }</td>
                                        <td className="border px-4 py-2">{ product.company?.coporate_name }</td>
                                        <td className="border px-4 py-2">{product.overview}</td>
                                        <td className="border px-4 py-2">
                                            { product?.reward_type === 1 && `￥${product?.reward_amount}` }
                                            { product?.reward_type === 2 && `${product?.reward_amount}%` }
                                        </td>
                                        <td className="border px-4 py-2">{product.status_label}</td>
                                        <td className="border px-4 py-2">
                                            <Link href={route('admin.products.show', [product.id])} className="text-blue-500 hover:text-blue-700">詳細</Link>
                                            {
                                                product.status == 3 && 
                                                <button onClick={() => toggleBlockModal((products.current_page - 1) * products.per_page + index + 1, product) } className="ml-2 text-cyan-500 hover:text-blue-700">ブロック</button>
                                            }
                                            <button onClick={() => toggleModal((products.current_page - 1) * products.per_page + index + 1, product) } className="ml-2 text-red-500 hover:text-blue-700">削除</button>
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
            <AdminPageNavs items={products} />
            <DeleteModal data={isDeleteSelected} isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteProduct} />
            <BlockModal data={isBlockSelected} isOpen={isOpenBlockModal} product={selectedBlockProduct} onClose={toggleBlockModal} onSubmit={blockProduct} />
        </AdminAuthLayout>
    );
}
