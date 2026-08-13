import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useForm, router } from "@inertiajs/react";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import AdminCompanyCard from "@/Components/Admin/AdminCompanyCard";
import Card from "@/Components/Card";
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Toast } from 'primereact/toast';
import LinkIcon from "@/Components/Icons/LinkIcon";
import RefreshIcon from "@/Components/Icons/RefreshIcon";
import DeleteModal from "@/Components/Admin/DeleteModal";
import PrimaryButton from "@/Components/PrimaryButton";
import CameraIcon from '@/Components/Icons/CameraIcon';
import EmailChangeModal from '@/Components/EmailChangeModal';
import PasswordChangeModal from '@/Components/PasswordChangeModal';
import PhoneNumberChangeModal from '@/Components/PhoneNumberChangeModal';
import { Inertia } from "@inertiajs/inertia";
import CustomSelect from '@/Components/CustomSelect';
import ProductCard from "@/Components/Users/ProductCard";
import AdminAuthLayout from "@/Layouts/Admin/AdminAuthLayout";
import CustomRadioButtons from "@/Components/CustomRadioButtons";
import dayjs from 'dayjs';


export default function Edit({
    user,
    company,
    managers,
    operator_types,
    business_types,
    prefs,
}) {
    const buttonRef = useRef(null);
    const toast = useRef(null);

    const [companyImage, setcompanyImage] = useState(user.avatar_url);
    
    // image 
    const imageForm = useForm({
        image: null,
    }); 
    
    const triggerClick = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    };

    const selectImage = () => {
        triggerClick();
    }

    const handleImageSubmit = () => {
        imageForm.post(route('admin.account.info.image', [user.id]), {
            onFinish: () => {
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // const reader = new FileReader();
            // imageForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setcompanyImage(reader.result);
                
                imageForm.setData('image', file);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (imageForm.data.image && imageForm.data.image.size / 1024 > 2048) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'エラー', 
                detail: '画像のサイズは2MB以下にしてください。' // エラーメッセージを適切に設定
            });
            return; // 修正：タイポ
        }

        if (imageForm.data.image) {
            handleImageSubmit()
        }
        
    }, [imageForm.data.image]);

    // submit data
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,        
        coporate_name: company.coporate_name ?? '',
        summary: company.summary ?? '',
        overview: company.overview ?? '',
    });
        
    const submit = () => {
        post(route('admin.companies.update', [user.id]), {
            onFinish: () => {
                
            },
        });
    }

    const [isEmailChange, setIsEmailChange] =useState(false);
    const [isPasswordChange, setIsPasswordChange] =useState(false);
    const [isPhoneNumberChange, setIsPhoneNumberChange] =useState(false);

    const handleSetData = (key, value) => {
        setData({...data, [key]: value});
    }

    const businessInfoForm = useForm({
        business_type: company.business_type ?? 1,
        office_name: company.office_name ?? '',
        office_kana: company.office_kana ?? '',
        coporate_code: company.coporate_code ?? '',
        site_url: company.site_url ?? '',
        office_postal_code: company.office_postal_code ?? '',
        office_pref: company.office_pref ?? '',
        office_city: company.office_city ?? '',
        office_area: company.office_area ?? '',
        office_street: company.office_street ?? '',
        office_building: company.office_building ?? '',
        office_phone_number: company.office_phone_number ?? '',
        operator_type: company.operator_type ?? 0,
        invoice_number: company.invoice_number ?? '',
        office_master_last_name: company.office_master_last_name ?? '',
        office_master_first_name: company.office_master_first_name ?? '',
        office_master_last_kana: company.office_master_last_kana ?? '',
        office_master_first_kana: company.office_master_first_kana ?? '',
        managers: [...managers, {}, {}, {}].slice(0, 3),
    });

    const handleBusinessInfoSetData = (key, value) => {
        businessInfoForm.setData({...businessInfoForm.data, [key]: value});
    }

    const handleManagerChange = (index, field, value) => {
        let newManagers = [...businessInfoForm.data.managers];
        newManagers[index] = { ...newManagers[index], [field]: value };
        newManagers = newManagers.filter((manager) => manager.first_name || manager.last_name || manager.first_kana || manager.last_kana || manager.phone_number || manager.email);
        newManagers = [...newManagers, {}, {}, {}].slice(0, 3);
        businessInfoForm.setData({...businessInfoForm.data, managers: newManagers});
    };

    const businessInfoSubmit = () => {
        businessInfoForm.post(route('admin.companies.business.info', [user.id]), {
            onFinish: () => {
            },
        });
    }   
    return (
        <AdminAuthLayout>     
            <Toast ref={toast} /> 
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%]  pt-[50px] pb-[35px] bg-white border border-gray-200 rounded-lg shadow-md mt-[70px] md:mt-[90px] mb-[6%]">
                    <div className="flex items-center justify-center cursor-pointer">
                        <div onClick={selectImage} className="relative w-24 h-24 border-[3px] border-white rounded-full -mt-32">
                            <img className="w-full h-full rounded-full object-cover" src={companyImage} alt="company" />
                            <div className="absolute -bottom-3 right-2 rounded-full bg-white border border-gray-600 size-7 flex items-center justify-center">
                                <CameraIcon className="size-4" />
                            </div>
                        </div>
                        <input ref={buttonRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>

                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-4 font-bold">アカウント情報</div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">アカウント名</div>
                                <div className="text-[14px] grow max-w-[500px] text-right">
                                    {company.coporate_name}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 py-3 border-b border-gay-200">
                            <div className="flex items-start justify-between gap-2">
                                <div className="text-[14px]">紹介文</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <div className="relative">
                                        <textarea
                                            className="w-full p-3 pr-6 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[14px]" 
                                            rows="5"
                                            value={data.summary}
                                            onChange={(e) => handleSetData('summary', e.target.value.substring(0, 300))}
                                        />
                                        <div className="absolute right-2 bottom-3 text-[12px]">/300</div>
                                    </div>
                                    <InputError message={errors.summary} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 py-3 border-b border-gay-200">
                            <div className="flex items-start justify-between gap-2">
                                <div className="text-[14px]">会社概要</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <div className="relative">
                                        <textarea
                                            className="w-full p-3 pr-6 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[14px]" 
                                            rows="5"
                                            value={data.overview}
                                            onChange={(e) => handleSetData('overview', e.target.value.substring(0, 500))}
                                        />
                                        <div className="absolute right-2 bottom-3 text-[12px]">/500</div>
                                    </div>
                                    <InputError message={errors.overview} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">個人メールアドレス（非公開）</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{user.email}</div>
                                    <button onClick={() => {setIsEmailChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">現在のパスワード（非公開）</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">**********</div>
                                    <button onClick={() => {setIsPasswordChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center my-12">
                            <PrimaryButton 
                                onClick={submit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80" 
                            >
                                保存する
                            </PrimaryButton>
                        </div>
                    </div>   

                </div>

                <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-4 font-bold">事業者情報</div>
                        <div className="mb-12">
                            <h2 className="text-[18px] font-semibold">基本情報</h2>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">会社名</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="office_name"
                                            value={businessInfoForm.data.office_name}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('office_name', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.office_name} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">会社名ガナ</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="office_kana"
                                            value={businessInfoForm.data.office_kana}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('office_kana', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.office_kana} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">事業形態</div>
                                    <div className="relative text-[14px] grow max-w-[500px] text-right">
                                        <CustomSelect
                                            className="w-full"
                                            currentOption={businessInfoForm.data.business_type}
                                            options={business_types}
                                            onSelect={(value) => {handleBusinessInfoSetData('business_type', value)}} />
                                        <InputError message={businessInfoForm.errors.business_type} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">法人番号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="coporate_code"
                                            value={businessInfoForm.data.coporate_code}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('coporate_code', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.coporate_code} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="text-[14px] mb-4">住所</div>

                                <div className="mb-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">郵便番号</div>
                                        <div className="relative text-[14px] grow max-w-[500px]">
                                            <div >
                                                <TextInput
                                                    type="text"
                                                    name="office_postal_code"
                                                    value={businessInfoForm.data.office_postal_code}
                                                    className="mt-1 block w-full pr-8"
                                                    onChange={(e) => handleBusinessInfoSetData('office_postal_code', e.target.value)}
                                                />
                                                <InputError message={businessInfoForm.errors.office_postal_code} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2 pt-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">都道府県</div>
                                        <div className="relative text-[14px] grow max-w-[500px]">
                                            <CustomSelect
                                                first="都道府県"
                                                className="w-full"
                                                currentOption={businessInfoForm.data.office_pref}
                                                options={prefs}
                                                onSelect={ (value) => { handleBusinessInfoSetData('office_pref', value) } }
                                            />
                                            <InputError message={businessInfoForm.errors.office_pref} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">市区町村</div>
                                        <div className="relative text-[14px] grow max-w-[500px]">
                                            <TextInput
                                                type="text"
                                                name="office_city"
                                                value={businessInfoForm.data.office_city}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handleBusinessInfoSetData('office_city', e.target.value)}
                                            />
                                            <InputError message={businessInfoForm.errors.office_city} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">町域</div>
                                        <div className="relative text-[14px] grow max-w-[500px]">
                                            <TextInput
                                                type="text"
                                                name="office_area"
                                                value={businessInfoForm.data.office_area}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handleBusinessInfoSetData('office_area', e.target.value)}
                                            />
                                            <InputError message={businessInfoForm.errors.office_area} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">丁目・番地・号</div>
                                        <div className="relative text-[14px] grow max-w-[500px]">
                                            <TextInput
                                                type="text"
                                                name="office_street"
                                                value={businessInfoForm.data.office_street}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handleBusinessInfoSetData('office_street', e.target.value)}
                                            />
                                            <InputError message={businessInfoForm.errors.office_street} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">建物名・階数・部屋番号</div>
                                        <div className="relative text-[14px] grow max-w-[500px]">
                                            <TextInput
                                                type="text"
                                                name="office_building"
                                                value={businessInfoForm.data.office_building}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handleBusinessInfoSetData('office_building', e.target.value)}
                                            />
                                            <InputError message={businessInfoForm.errors.office_building} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">電話番号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="office_phone_number"
                                            value={businessInfoForm.data.office_phone_number}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('office_phone_number', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.office_phone_number} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">Webサイトリンク</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="site_url"
                                            value={businessInfoForm.data.site_url}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('site_url', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.site_url} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">事業者形態</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <CustomRadioButtons id="operator_type" currentOption={businessInfoForm.data.operator_type} options={operator_types} onChange={(value) => handleBusinessInfoSetData('operator_type', value)} className="flex-row"/>
                                        <InputError message={businessInfoForm.errors.operator_type} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {
                                businessInfoForm.data.operator_type == 1 && <div className=" py-4 border-b border-gay-200">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">インボイス番号</div>
                                        <div className="relative text-[14px] grow max-w-[500px]">
                                            <TextInput
                                                type="text"
                                                name="invoice_number"
                                                value={businessInfoForm.data.invoice_number}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handleBusinessInfoSetData('invoice_number', e.target.value)}
                                            />
                                            <InputError message={businessInfoForm.errors.invoice_number} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="mb-12">
                            <h2 className="text-[18px] font-semibold">代表者情報</h2>

                            <div className="flex items-center justify-between gap-8">
                                <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                    <div className="text-[14px]">姓</div>
                                    <div className="relative text-[14px] grow max-w-[400px]">
                                        <TextInput
                                            type="text"
                                            name="office_master_first_name"
                                            value={businessInfoForm.data.office_master_first_name}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('office_master_first_name', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.office_master_first_name} className="mt-2" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                    <div className="text-[14px]">名</div>
                                    <div className="relative text-[14px] grow max-w-[400px]">
                                        <TextInput
                                            type="text"
                                            name="office_master_last_name"
                                            value={businessInfoForm.data.office_master_last_name}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('office_master_last_name', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.office_master_last_name} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-8">
                                <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                    <div className="text-[14px]">姓カナ</div>
                                    <div className="relative text-[14px] grow max-w-[400px]">
                                        <TextInput
                                            type="text"
                                            name="office_master_first_kana"
                                            value={businessInfoForm.data.office_master_first_kana}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('office_master_first_kana', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.office_master_first_kana} className="mt-2" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                    <div className="text-[14px]">名カナ</div>
                                    <div className="relative text-[14px] grow max-w-[400px]">
                                        <TextInput
                                            type="text"
                                            name="office_master_last_kana"
                                            value={businessInfoForm.data.office_master_last_kana}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('office_master_last_kana', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.office_master_last_kana} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-[18px] font-semibold mb-6">担当者情報</h2>
                            {businessInfoForm.data.managers.map((manager, index) => (
                                <div key={index} className="mb-8">
                                    <h2 className="text-[18px] font-semibold ">管理者{index + 1}</h2>

                                    <div className="">
                                        <div className="flex items-center justify-between gap-8">
                                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                                <div className="text-[14px]">姓</div>
                                                <div className="relative text-[14px] grow max-w-[400px]">
                                                    <TextInput
                                                        type="text"
                                                        name="manager_first_name"
                                                        value={manager.first_name ?? ""}
                                                        className="mt-1 block w-full pr-8"
                                                        onChange={(e) => handleManagerChange(index, "first_name", e.target.value)}
                                                    />
                                                    <InputError message={businessInfoForm.errors[`managers.${index}.first_name`]} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                                <div className="text-[14px]">名</div>
                                                <div className="relative text-[14px] grow max-w-[400px]">
                                                    <TextInput
                                                        type="text"
                                                        name="manager_last_name"
                                                        value={manager.last_name ?? ""}
                                                        className="mt-1 block w-full pr-8"
                                                        onChange={(e) => handleManagerChange(index, "last_name", e.target.value)}
                                                    />
                                                    <InputError message={businessInfoForm.errors[`managers.${index}.last_name`]} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-8">
                                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                                <div className="text-[14px]">姓カナ</div>
                                                <div className="relative text-[14px] grow max-w-[400px]">
                                                    <TextInput
                                                        type="text"
                                                        name="manager_first_kana"
                                                        value={manager.first_kana ?? ""}
                                                        className="mt-1 block w-full pr-8"
                                                        onChange={(e) => handleManagerChange(index, 'first_kana', e.target.value)}
                                                    />
                                                    <InputError message={businessInfoForm.errors[`managers.${index}.first_kana`]} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                                <div className="text-[14px]">名カナ</div>
                                                <div className="relative text-[14px] grow max-w-[400px]">
                                                    <TextInput
                                                        type="text"
                                                        name="manager_last_kana"
                                                        value={manager.last_kana ?? ""}
                                                        className="mt-1 block w-full pr-8"
                                                        onChange={(e) => handleManagerChange(index, 'last_kana', e.target.value)}
                                                    />
                                                    <InputError message={businessInfoForm.errors[`managers.${index}.last_kana`]} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" py-4 border-b border-gay-200">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="text-[14px]">電話番号</div>
                                                <div className="relative text-[14px] grow max-w-[500px]">
                                                    <TextInput
                                                        type="text"
                                                        name="manager_phone_number"
                                                        value={manager.phone_number ?? ""}
                                                        className="mt-1 block w-full pr-8"
                                                        onChange={(e) => handleManagerChange(index, 'phone_number', e.target.value)}
                                                    />
                                                    <InputError message={businessInfoForm.errors[`managers.${index}.phone_number`]} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" py-4 border-b border-gay-200">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="text-[14px]">メールアドレス</div>
                                                <div className="relative text-[14px] grow max-w-[500px]">
                                                    <TextInput
                                                        type="email"
                                                        name="manager_email"
                                                        value={manager.email ?? ""}
                                                        className="mt-1 block w-full pr-8"
                                                        onChange={(e) => handleManagerChange(index, 'email', e.target.value)}
                                                    />
                                                    <InputError message={businessInfoForm.errors[`managers.${index}.email`]} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center my-12">
                            <PrimaryButton
                                onClick={businessInfoSubmit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80"
                            >
                                保存する
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <EmailChangeModal
                user={user}
                isOpen={isEmailChange}
                onClose={() => {setIsEmailChange(false)}}
            />
            <PasswordChangeModal
                user={user}
                isOpen={isPasswordChange}
                onClose={() => {setIsPasswordChange(false)}}
            />
            <PhoneNumberChangeModal
                user={user}
                isOpen={isPhoneNumberChange}
                onClose={() => {setIsPhoneNumberChange(false)}}
            />

        </AdminAuthLayout>
    );
}
