import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useForm } from "@inertiajs/react";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import AdminCompanyCard from "@/Components/Admin/AdminCompanyCard";
import Card from "@/Components/Card";
import LinkIcon from "@/Components/Icons/LinkIcon";
import RefreshIcon from "@/Components/Icons/RefreshIcon";
import DeleteModal from "@/Components/Admin/DeleteModal";
import PrimaryButton from "@/Components/PrimaryButton";
import { Inertia } from "@inertiajs/inertia";
import AcceptModal from '@/Components/Admin/AcceptModal';
import AdminAuthLayout from "@/Layouts/Admin/AdminAuthLayout";
import dayjs from 'dayjs';


export default function Show({
    user, 
    products,
    managers
}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOfficeEdit, setIsOfficeEdit] = useState(false);
    const [isMasterEdit, setIsMasterEdit] = useState(false);
    const [isWorkerEdit, setIsWorkerEdit] = useState(false);
    const [office, setOffice] = useState(user.company);
    const [workers, setWorkers] = useState(managers);       

    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString("sv-SE", { timeZone: "Asia/Tokyo", hour12: false }).replace("T", " ").slice(0, -3));

    const { data, setData, post, processing, errors, reset } = useForm({
    });
    
    const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const toggleAcceptModal = (type) => {
        setIsOpenAcceptModal(prevState => !prevState);
        setSelectedType(type);
    }

    const actionForm = useForm();

    const acceptCompany = () => {
        actionForm.post(route('admin.companies.accept', [user.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }

    const rejectCompany = () => {
        actionForm.post(route('admin.companies.reject', [user.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }
    
    const reloadPage = () => {
        Inertia.reload({ only: ["user"] });
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }
    
    function formatDate(dateString) {
        return dayjs(dateString).format("YYYY/MM/DD");
    }

    const handleClickEdit = (e) => {
        e.preventDefault();
        const { name, id } = e.target;

        toggleEidtUI(name, id);
    };

    const toggleModal = () => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
    }

    const deleteCompany = () => {
        post(route('admin.companies.delete', [user.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            }
        });
    }


    return (
        <AdminAuthLayout>                
            <div className="w-[92%] mx-auto mt-[4%] mb-6 py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="flex items-center justify-center">
                    <div className="relative border-[3px] border-white rounded-full -mt-28">
                        <img className="w-24 h-24 rounded-full object-cover" src={user.avatar_url} alt="company" />
                    </div>
                </div>

                <div className=" w-[92%] mx-auto text-[20px] mb-4 font-bold">アカウント情報</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 w-[92%] mx-auto">

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">氏名</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{user.company?.last_name} {user.company?.first_name}</div>
                            </div>
                        </div>
                    </div>

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">氏名カナ</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{user.company?.last_kana} {user.company?.first_kana}</div>
                            </div>
                        </div>
                    </div>

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">ニックネーム</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{user.company?.nickname}</div>
                            </div>
                        </div>
                    </div>

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">メールアドレス</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{user.email}</div>
                                {/* <button onClick={() => {setIsEmailChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> */}
                            </div>
                        </div>
                    </div>

                    {/* <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                        <div className="text-[14px]">現在のパスワード（非公開）</div>
                        <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                        <div className="text-[14px]">**********</div>
                        <button onClick={() => {setIsPasswordChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                        </div>
                        </div>
                        </div> */}

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">追加メールアドレス</div>
                            <div className="text-[14px]">{user.company?.extra_email}</div>
                        </div>
                    </div>


                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">電話番号</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{user.company?.phone_number}</div>
                                {/* <button onClick={() => {setIsPhoneNumberChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> */}
                            </div>
                        </div>
                    </div>

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">生年月日</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{formatDate(user.company?.birthday)}</div>
                            </div>
                        </div>
                    </div>

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">郵便番号</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{ user.company?.postal_code} </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                        <p className="md:w-[180px] w-full py-4">
                            住所
                        </p>
                        {isOfficeEdit ? (
                            <div className="flex-1 flex items-center justify-between gap-1">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="pref"
                                        index="main"
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                        onChange={
                                            handleInputChange
                                        }
                                        value={
                                            office?.pref ?? ""
                                        }
                                    />
                                    {errors.pref && (
                                        <InputError
                                            message={
                                                errors.pref
                                            }
                                            className="mt-1 text-[12px] text-right"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="city"
                                        index="main"
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                        onChange={
                                            handleInputChange
                                        }
                                        value={
                                            office?.city ?? ""
                                        }
                                    />
                                    {errors.city && (
                                        <InputError
                                            message={
                                                errors.city
                                            }
                                            className="mt-1 text-[12px] text-right"
                                        />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="area"
                                        index="main"
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                        onChange={
                                            handleInputChange
                                        }
                                        value={
                                            office?.area ?? ""
                                        }
                                    />
                                    {errors.area && (
                                        <InputError
                                            message={
                                                errors.area
                                            }
                                            className="mt-1 text-[12px] text-right"
                                        />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="street"
                                        index="main"
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                        onChange={
                                            handleInputChange
                                        }
                                        value={
                                            office?.street ?? ""
                                        }
                                    />
                                    {errors.street && (
                                        <InputError
                                            message={
                                                errors.street
                                            }
                                            className="mt-1 text-[12px] text-right"
                                        />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="building"
                                        index="main"
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                        onChange={
                                            handleInputChange
                                        }
                                        value={
                                            office?.building ??
                                            ""
                                        }
                                    />
                                    {errors.building && (
                                        <InputError
                                            message={
                                                errors.building
                                            }
                                            className="mt-1 text-[12px] text-right"
                                        />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="md:mt-0 mt-2 py-4">
                                {office?.full_address}
                            </p>
                        )}
                    </div>

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">お住まいの国</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{user.company?.country}</div>
                            </div>
                        </div>
                    </div>

                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">本人確認</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">{user.company?.sms_verified_at ? '完了' : '未完了'}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[14px]">関心のあるカテゴリ</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">
                                    {
                                        user.company?.categories?.map((category, index) => (
                                            <span key={category.id + "-category"+index}>{category.name}{(user.company?.categories.length - 1) != index ? '/ ' : ''}</span>
                                        ))
                                    }
                                </div>
                                {/* <button onClick={() => {setIsCategoryChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> */}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 py-3 border-b border-gay-200">
                        <div className="flex items-start justify-between gap-2">
                            <div className="text-[14px]">アピール文</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">
                                    {user.company?.appeal_statement}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 py-3 border-b border-gay-200">
                        <div className="flex items-start justify-between gap-2">
                            <div className="text-[14px]">自己紹介文</div>
                            <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                <div className="text-[14px]">
                                    {user.company?.introduction}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className=" py-4 border-b border-gay-200">
                        <div className="flex items-center justify-between gap-2">
                        <div className="text-[14px]">希望する商材の地域</div>
                        <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                        <div className="text-[14px]">
                        {
                            JSON.parse(user.company?.prefectures)?.map((area, index) => (
                                <span key={area + "-area-"+index}>{area}{(JSON.parse(user.company?.prefectures)?.length - 1) != index ? '/' : ''}</span>
                                ))
                                }
                                </div>
                                <button onClick={() => {setIsAreaChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> 
                                </div>
                                </div>
                                </div> */}
                    
                </div>
            </div>

            <div className="w-[92%] mx-auto mt-[4%] mb-12 py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="w-[92%] mx-auto relative">
                    <div className="text-[20px] font-semibold mb-2">事業者情報</div>

                    <div className="mb-16">
                        <div className="flex items-center justify-between py-4">
                            <h2 className="text-[18px] font-semibold">
                                基本情報
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ">
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    会社名
                                </p>
                                {isOfficeEdit ? (
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            name="office_name"
                                            index="main"
                                            className="p-2 border border-gray-300 rounded-md w-full text-right"
                                            onChange={handleInputChange}
                                            value={
                                                office?.office_name ?? ""
                                            }
                                        />
                                        {errors.office_name && (
                                            <InputError
                                                message={
                                                    errors.office_name
                                                }
                                                className="mt-1 text-[12px] text-right"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p className="md:mt-0 mt-2 py-4">
                                        {office?.office_name}
                                    </p>
                                )}
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    会社名カナ
                                </p>
                                {isOfficeEdit ? (
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            name="office_name_kana"
                                            index="main"
                                            className="p-2 border border-gray-300 w-full rounded-md flex-1 text-right"
                                            onChange={handleInputChange}
                                            value={
                                                office?.office_name_kana ??
                                                ""
                                            }
                                        />
                                        {errors.office_name_kana && (
                                            <InputError
                                                message={
                                                    errors.office_name_kana
                                                }
                                                className="mt-1 text-[12px] text-right"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p className="md:mt-0 mt-2 py-4">
                                        {office?.office_name_kana}
                                    </p>
                                )}
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    事業形態
                                </p>
                                {isOfficeEdit ? (
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            name="office_type_name"
                                            index="main"
                                            className="p-2 border border-gray-300 w-full rounded-md flex-1 text-right"
                                            onChange={handleInputChange}
                                            value={
                                                office?.office_type_name ??
                                                ""
                                            }
                                        />
                                    </div>
                                ) : (
                                    <p className="md:mt-0 mt-2 py-4">
                                        {office?.office_type_name}
                                    </p>
                                )}
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    法人番号
                                </p>
                                {isOfficeEdit ? (
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            name="coporate_code"
                                            index="main"
                                            className="p-2 border border-gray-300 w-full rounded-md flex-1 text-right"
                                            onChange={handleInputChange}
                                            value={
                                                office?.coporate_code ??
                                                ""
                                            }
                                        />
                                        {errors.coporate_code && (
                                            <InputError
                                                message={
                                                    errors.coporate_code
                                                }
                                                className="mt-1 text-[12px] text-right"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p className="md:mt-0 mt-2 py-4">
                                        {office?.coporate_code}
                                    </p>
                                )}
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    電話番号
                                </p>
                                {isOfficeEdit ? (
                                    <input
                                        type="text"
                                        name="phone_number"
                                        index="main"
                                        className="p-2 border border-gray-300 rounded-md flex-1 text-right"
                                        onChange={handleInputChange}
                                        value={
                                            office?.phone_number ?? ""
                                        }
                                    />
                                ) : (
                                    <p className="md:mt-0 mt-2 py-4">
                                        {office?.phone_number ?? ""}
                                    </p>
                                )}
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    住所
                                </p>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {office?.full_address}
                                    </div>
                                </div>
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    インボイス番号
                                </p>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {user.company?.operator_type_label}
                                    </div>
                                </div>
                            </div>
                            {    
                                office?.operator_type == 1 && <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                    <p className="md:w-[180px] w-full py-4">
                                        インボイス番号
                                    </p>
                                    <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                        <div className="text-[14px]">
                                            {user.company?.invoice_number}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="mb-16">
                        <div className="flex items-center justify-between py-4">
                            <h2 className="text-[18px] font-semibold">
                                代表者情報
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    代表者名
                                </p>
                                <p className="md:mt-0 mt-2 py-4">
                                    {office?.full_office_master_name}
                                </p>
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                <p className="md:w-[180px] w-full py-4">
                                    代表者名カナ
                                </p>                            
                                <p className="md:mt-0 mt-2 py-4">
                                    {office?.full_office_master_kana_name}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-between py-4 ">
                            <h2 className="text-[18px] font-bold">
                                担当者情報
                            </h2>
                        </div>
                        {workers.map((worker, index) => (
                            <div key={index} className="mt-4">
                                <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                    <p className="md:w-[180px] w-full py-4">
                                        担当者{index + 1}
                                    </p>
                                    <button
                                        type="button"
                                        name="worker"
                                        id={index}
                                        className="text-primary text-[16px] font-semibold hover:text-blue-400"
                                        onClick={handleClickEdit}
                                    >
                                        編集
                                    </button>
                                </div>
                                <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                    <p className="md:w-[180px] w-full py-4">
                                        担当者名
                                    </p>
                                    <p className="md:mt-0 mt-2 py-4">
                                        {worker.full_name}
                                    </p>
                                </div>
                                <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                    <p className="md:w-[180px] w-full py-4">
                                        担当者名カナ
                                    </p>
                                    <p className="md:mt-0 mt-2 py-4">
                                        {worker.full_name_kana}
                                    </p>
                                </div>
                                <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                    <p className="md:w-[180px] w-full py-4">
                                        電話番号
                                    </p>
                                    <p className="md:mt-0 mt-2 py-4">
                                        {worker.phone_number}
                                    </p>
                                </div>
                                <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                    <p className="md:w-[180px] w-full py-4">
                                        メールアドレス
                                    </p>
                                    <p className="md:mt-0 mt-2 py-4">
                                        {worker.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {workers.length === 0 && (
                            <div className="flex justify-center items-center h-[100px] text-[16px]">
                                <p>担当者情報がありません。</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="w-[92%] mx-auto bg-white shadow-lg rounded-lg mt-8">
                <div className="w-[92%] mx-auto text-[20px] font-semibold pt-12 mb-8">取引情報</div>
                <div className="w-[92%] mx-auto pb-[32px] mb-[32px]">

                    <div className=" flex justify-end">
                        <Link
                            onClick={reloadPage}
                            className="w-fit flex justify-end items-center hover:opacity-50"
                        >
                            {currentDateTime} 現在
                            <RefreshIcon
                                width="16px"
                                height="16px"
                                color="#333333"
                                className="ml-2"
                            />
                        </Link>
                    </div>

                    <div className="mt-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                            <Link href="./">
                                <div className="px-4 py-4 relative">
                                    <p className="text-[18px]">総売上</p>
                                    <p className="mt-2 text-2xl font-bold">
                                        ¥<span className="text-4xl">155,000</span>
                                    </p>
                                    <LinkIcon
                                        width={6}
                                        heigh={6}
                                        className="text-gray-500 absolute right-1 top-12"
                                    />
                                </div>
                            </Link>

                            <Link href="./">
                                <Card isLink={true} color='bg-gradient-to-r from-[#344ef0] to-[#2db6f6]'>
                                    <div className="px-4 py-8 relative">
                                        <p className="text-left text-white text-xs">
                                            今月の売上
                                        </p>
                                        <p className="text-left text-white text-lg font-semibold">
                                            ￥<span className="text-2xl">20,000</span>
                                        </p>
                                        <span className="block w-6 h-6 rounded-full text-center text-[12px] font-semibold text-blue-500 absolute right-0 top-10 bg-[#2188fb]">
                                            <LinkIcon
                                                width={4}
                                                heigh={4}
                                                className="text-white absolute top-1 right-1"
                                            />
                                        </span>
                                    </div>
                                </Card>
                            </Link>
                            <Link href="./">
                                <Card isLink={true} color='bg-gradient-to-r from-[#4dcdf7] to-[#5eedee]'>
                                    <div className="px-4 py-8 relative">
                                        <p className="text-left text-white text-xs">
                                            支払い最終期限
                                        </p>
                                        <p className="text-left text-white text-lg font-semibold">
                                            ￥<span className="text-2xl">35,000</span>
                                        </p>
                                        <span className="block w-6 h-6 rounded-full text-center text-[12px] font-semibold text-blue-500 absolute right-0 top-10 bg-[#50d5f5]">
                                            <LinkIcon
                                                width={4}
                                                heigh={4}
                                                className="text-white absolute top-1 right-1"
                                            />
                                        </span>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold vertical-end text-base">
                                <span>紹介を受けた案件</span>
                                <span className="ml-2 text-primary text-3xl">
                                    {user.total_orders_count}
                                </span>
                                <span className="ml-1">件</span>
                            </p>
                            <Link
                                href={`${route('admin.transactions')}?company=${user.id}`} 
                                className="flex items-center justify-end ml-auto break-keep font-semibold"
                            >
                                <LinkIcon width={4} height={4} />
                                取引履歴を見る
                            </Link>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-2">
                            <AdminCompanyCard
                                cardTitle="未対応"
                                cardValue={user.requested_orders_count}
                                url={`${route('admin.transactions')}?company=${user.id}&status=0`}
                            />
                            <AdminCompanyCard
                                cardTitle="商談中"
                                cardValue={user.responding_orders_count}
                                url={`${route('admin.transactions')}?company=${user.id}&status=1`}
                            />
                            <AdminCompanyCard
                                cardTitle="成立"
                                cardValue={user.accepted_orders_count}
                                url={`${route('admin.transactions')}?company=${user.id}&status=2`}
                            />
                            <AdminCompanyCard
                                cardTitle="不成立"
                                cardValue={user.rejected_orders_count}
                                url={`${route('admin.transactions')}?company=${user.id}&status=3`}
                            />
                            <AdminCompanyCard
                                cardTitle="売上報告中"
                                cardValue={user.reported_orders_count}
                                url={`${route('admin.transactions')}?company=${user.id}&status=4`}
                            />
                            <AdminCompanyCard
                                cardTitle="入金確認中"
                                cardValue={user.payed_orders_count}
                                url={`${route('admin.transactions')}?company=${user.id}&status=5`}
                            />
                            <AdminCompanyCard
                                cardTitle="完了"
                                cardValue={user.completed_orders_count}
                                url={`${route('admin.transactions')}?company=${user.id}&status=6`}
                            />
                        </div>
                    </div>

                    <div className="pt-12 pb-4">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold vertical-end text-base">
                                <span>出品審査中の商材</span>
                                <span className="ml-2 text-primary text-3xl">
                                    {user.total_products_count}
                                </span>
                                <span className="ml-1">件</span>
                            </p>
                            <Link
                                href={`${route('admin.products.accepted')}?company=${user.id}`} 
                                className="flex items-center justify-end ml-auto break-keep font-semibold"
                            >
                                <LinkIcon width={4} height={4} />
                                商材を見る
                            </Link>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-2">
                            <AdminCompanyCard
                                cardTitle="審査中"
                                cardValue={user.total_reviews_products_count}
                                url={`${route('admin.products.requested')}?company=${user.company?.id}`}
                            />
                            <AdminCompanyCard
                                cardTitle="公開中"
                                cardValue={user.total_public_products_count}
                                url={`${route('admin.products.accepted')}?company=${user.company?.id}&status=3`}
                            />
                            <AdminCompanyCard
                                cardTitle="出品停止中"
                                cardValue={user.total_stopped_products_count}
                                url={`${route('admin.products.accepted')}?company=${user.company?.id}&status=4`}
                            />
                            <AdminCompanyCard
                                cardTitle="出品不可"
                                cardValue={user.total_blocked_products_count}
                                url={`${route('admin.products.blocked')}?company=${user.company?.id}`}
                            />
                            <AdminCompanyCard
                                cardTitle="削除"
                                cardValue={user.total_expired_products_count}
                                url={`${route('admin.products.accepted')}?company=${user.company?.id}&status=6`}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
            {
                user.status > 0 && <div className="flex gap-8 w-full justify-center mb-[200px]">
                    <Link
                        href={route('admin.companies.edit', [user.id])}
                        className="justify-center font-semibold w-[200px] text-xs h-[50px] flex items-center ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80 text-white rounded-full"
                    >
                        編集する
                    </Link>
                    <PrimaryButton
                        onClick={toggleModal}
                        className="text-center h-[50px] w-[200px] bg-red-500 hover:opacity-80 focus:opacity-80"
                    >
                        削除する
                    </PrimaryButton>
                </div>
            }

            {
                user.status == 0 && <div className="flex gap-8 w-full justify-center mb-[200px]">
                    <button onClick={() => {toggleAcceptModal('許可')}} className="justify-center font-semibold w-[200px] text-xs h-[50px] flex items-center ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80 text-white rounded-full">
                        許可する
                    </button>
                    <PrimaryButton onClick={() => {toggleAcceptModal('不許')}} className="text-center h-[50px] w-[200px] bg-red-500 hover:opacity-80 focus:opacity-80">
                        不許する
                    </PrimaryButton>
                </div>
            }
                
            <AcceptModal type={selectedType} isOpen={isOpenAcceptModal} onClose={toggleAcceptModal} onSubmit={selectedType == '許可' ? acceptCompany : rejectCompany} />
            <DeleteModal isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteCompany} />
        </AdminAuthLayout>
    );
}
