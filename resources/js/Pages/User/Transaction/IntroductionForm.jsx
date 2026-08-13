import React, { useRef, useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import InputLabel from '@/Components/InputLabel';
import UserAuthLayout from '@/Layouts/UserAuthLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import CustomRadioButtons from "@/Components/CustomRadioButtons";
import CustomCheckbox from "@/Components/CustomCheckbox";
import BackButton from "@/Components/BackButton";
import TransactionInfo from "./TransactionInfo";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Toast } from 'primereact/toast';

export default function IntroductionForm({
    company,
    product,
    prefs,
    plan,
    RewardTypes,
    Approaches,
}) {
    const toast = useRef(null);
    const [isSubmited, setIsSubmited] = useState(false);

    if (isSubmited) {
        location.href = route('transaction.introduction', [product.id]);
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        target_last_name: '',
        target_first_name: '',
        target_last_kana: '',
        target_first_kana: '',
        contact_with: 1,
        target_email: '',
        target_email_confirmation: '',
        target_phone_number: '',
        target_post_number: '',
        target_pref: '',
        target_city: '',
        target_area: '',
        target_street: '',
        target_building: '',
        target_company: '',
        target_position: '',
        is_checked: false,
    });
    
    const handleSetData = (id, value) => {
        setData({...data, [id]: value});
    };    
    
    const submit = (e) => {
        e.preventDefault();

        post(route('transaction.introduction.form.store'), {
            onFinish: () => {
                if (errors.is_checked) {
                    toast.current.show({ 
                        severity: 'error', 
                        summary: 'エラー', 
                        detail: errors.is_checked 
                    });
                }      
            },
        });
    };

    useEffect(() => {
        if (errors.is_checked) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'エラー', 
                detail: errors.is_checked 
            });
        }
    }, [errors.is_checked]);
    
    return (
        <UserAuthLayout>            
            <Toast ref={toast} /> 

            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('transaction.introduction', [product.id])} className="w-6 h-6 my-6"></BackButton>
            </div>

            <div className="w-[92%] max-w-[1200px] mx-auto">
                <div className="block md:flex md:space-x-8 w-full mx-auto mb-20 md:mb-20">
                    <TransactionInfo 
                        product={product} 
                        plan={plan} 
                        RewardTypes={RewardTypes} 
                        company={company} 
                    />

                    <div className="grow">
                        <div className="text-[18px] mb-6">ご紹介フォーム</div>

                        <div className="w-full mx-auto mb-20 md:mb-40 bg-white shadow-md rounded-md">
                            <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                                <p className="text-[12px]">ご紹介を受ける方のご連絡先をご入力ください。</p>
                                <p className="text-[12px] mb-10">お間違いのないようお願いいたします。</p>

                                <div className="mb-6 ">

                                    <div className=" mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="font-semibold text-[14px]">氏名</div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="">
                                                <div className="text-[12px]" >姓</div>
                                                <TextInput
                                                    type="text"
                                                    name="target_last_name"
                                                    value={data.target_last_name}
                                                    className="mt-1 block w-full"
                                                    placeholder="例：山田"
                                                    onChange={(e) => handleSetData('target_last_name', e.target.value)}
                                                />
                                            </div>
                    
                                            <div className="">
                                                <div className="text-[12px]" >名</div>
                                                <TextInput
                                                    type="text"
                                                    name="target_first_name"
                                                    value={data.target_first_name}
                                                    className="mt-1 block w-full"
                                                    placeholder="例：太郎"
                                                    onChange={(e) => handleSetData('target_first_name', e.target.value)}
                                                />          
                                            </div>
                    
                                            <div className="">
                                                <div className="text-[12px]" >姓カナ</div>
                                                <TextInput
                                                    type="text"
                                                    name="target_last_kana"
                                                    value={data.target_last_kana}
                                                    className="mt-1 block w-full"
                                                    placeholder="例：ヤマダ"
                                                    onChange={(e) => handleSetData('target_last_kana', e.target.value)}
                                                />     
                                            </div>
                    
                                            <div className="">
                                                <div className="text-[12px]" >名カナ</div>
                                                <TextInput
                                                    type="text"
                                                    name="target_first_kana"
                                                    value={data.target_first_kana}
                                                    className="mt-1 block w-full"
                                                    placeholder="例：タロウ"
                                                    onChange={(e) => handleSetData('target_first_kana', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <InputError message={ errors.target_last_name ?? errors.target_first_name ?? errors.target_last_kana ?? errors.target_first_kana } className="mt-2" />        
                                        <div className="text-[12px] mt-2">※全角でご入力ください</div>
                                    </div>        

                                    <div className="pb-6 mb-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <InputLabel className=" font-semibold " value="ご希望の連絡方法" />
                                        </div>
                                        <div className="">
                                            <CustomRadioButtons 
                                                currentOption={data.contact_with} 
                                                options={Approaches} 
                                                onChange={(value) => {handleSetData('contact_with', value)}} />
                                        </div>
                                        <InputError message={errors.contact_with} className="mt-2" />  
                                        <div className="text-[12px] mt-4">※担当者からご連絡させていただきます。必ずご連絡がつく方法をご選択ください。</div>                                         
                                    </div>

                                    <div className="mb-6">
                                        <InputLabel className="font-semibold " value="メールアドレス" />
                                        <TextInput
                                            type="email"
                                            name="target_email"
                                            value={data.target_email}
                                            className="mt-1 block w-full"
                                            placeholder="例：taro@mail.com"
                                            onChange={(e) => handleSetData('target_email', e.target.value)}
                                        />
                                        <InputError message={errors.target_email} className="mt-2" />            
                                    </div>

                                    <div className="mb-6">
                                        <InputLabel className="" value="メールアドレス再入力" />
                                        <TextInput
                                            type="email"
                                            name="target_email_confirmation"
                                            value={data.target_email_confirmation}
                                            className="mt-1 block w-full"
                                            onChange={(e) => handleSetData('target_email_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.target_email_confirmation} className="mt-2" />            
                                    </div>

                                    <div className="pb-16 mb-16 border-b border-gray-200">
                                        <InputLabel className="" value="電話番号" />
                                        <TextInput
                                            type="text"
                                            name="target_phone_number"
                                            value={data.target_phone_number}
                                            className="mt-1 block w-full"
                                            inputMode="numeric"
                                            placeholder="例：090-1234-5678"
                                            onChange={(e) => handleSetData('target_phone_number', e.target.value)}
                                        />
                                        <InputError message={errors.target_phone_number} className="mt-2" />            
                                    </div>           

                                    <div className="pb-16 mb-16 border-b border-gray-200">
                                        <InputLabel type="任意" className="font-semibold mb-3" value="住所" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="">
                                                <div className="text-[12px]" >郵便番号</div>
                                                <TextInput
                                                    type="number"
                                                    name="target_post_number"
                                                    value={data.target_post_number}
                                                    className="mt-1 block w-full pr-8"
                                                    placeholder="例：1235091"
                                                    onChange={(e) => handleSetData('target_post_number', e.target.value)}
                                                />
                                            </div>
                                            <div className="">
                                                <div className="text-[12px] mb-1" >都道府県</div>
                                                <CustomSelect 
                                                    id="personal"
                                                    first=" " 
                                                    className="w-full" 
                                                    currentOption={data.target_pref} 
                                                    options={prefs} 
                                                    onSelect={ (value) => { handleSetData('target_pref', value) } } 
                                                />
                                            </div>
                                        </div>
                                        <InputError message={errors.target_post_number ?? errors.target_pref} className="mt-2" />
                    
                                        <div className="mt-3">
                                            <div className="text-[12px]" >市区町村</div>
                                            <TextInput
                                                type="text"
                                                name="target_city"
                                                value={data.target_city}
                                                className="mt-1 block w-full pr-8"
                                                placeholder="例：中央区"
                                                onChange={(e) => handleSetData('target_city', e.target.value)}
                                            />
                                            <InputError message={errors.target_city} className="mt-2" />
                                        </div>
                    
                                        <div className="mt-3">
                                            <div className="text-[12px]" >町域</div>                    
                                            <TextInput
                                                type="text"
                                                name="target_area"
                                                value={data.target_area}
                                                className="mt-1 block w-full pr-8"
                                                placeholder="例：銀座"
                                                onChange={(e) => handleSetData('target_area', e.target.value)}
                                            />
                                            <InputError message={errors.target_area} className="mt-2" />
                                        </div>
                    
                                        <div className="mt-3">
                                            <div className="text-[12px]" >丁目・番地・号</div>
                                            <TextInput
                                                type="text"
                                                name="target_street"
                                                value={data.target_street}
                                                className="mt-1 block w-full pr-8"
                                                placeholder="例：12-3-4"
                                                onChange={(e) => handleSetData('target_street', e.target.value)}
                                            />
                                            <InputError message={errors.target_street} className="mt-2" />
                                        </div>
                    
                                        <div className="mt-3">
                                            <div className="text-[12px]" >建物名・階数・部屋番号</div>
                                            <TextInput
                                                type="text"
                                                name="target_building"
                                                value={data.target_building}
                                                className="mt-1 block w-full pr-8"
                                                    placeholder="例：電気工事会館　5階"
                                                onChange={(e) => handleSetData('target_building', e.target.value)}
                                            />
                                            <InputError message={errors.target_building} className="mt-2" />
                                        </div>            
                                    </div>

                                    <div className="mb-6">
                                        <InputLabel type="任意" htmlFor="firstname" value="会社名" />
                                        <TextInput
                                            type="text"
                                            name="target_company"
                                            value={data.target_company}
                                            className="mt-1 block w-full"
                                            placeholder="例：株式会社〇〇"
                                            onChange={(e) => handleSetData('target_company', e.target.value)}
                                        />
                                        <InputError message={errors.target_company} className="mt-2" />                  
                                    </div>

                                    <div className="pb-16 mb-16 border-b border-gray-200">
                                        <InputLabel type="任意" value="役職" />
                                        <TextInput
                                            type="text"
                                            name="target_position"
                                            value={data.target_position}
                                            className="mt-1 block w-full"
                                            placeholder="例：営業担当"
                                            onChange={(e) => handleSetData('target_position', e.target.value)}
                                        />
                                        <InputError message={errors.target_position} className="mt-2" />                  
                                    </div>

                                    <div className="leading-6">
                                        上記にご入力いただいた内容をもとに担当よりご連絡差し上げます。<br />
                                        なお、今フォームを送信するとご紹介はキャンセルができません。<br />
                                        よくご確認の上送信へお進みください。
                                    </div>      

                                    <div className=" my-6">
                                        <CustomCheckbox
                                            currentOption={data.is_checked}     
                                            onChange={(value) => {handleSetData('is_checked', value)}}
                                            label="同意する"
                                        />
                                    </div>

                                    <div className="text-center mt-10">
                                        <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                                            送信
                                        </PrimaryButton>
                                    </div>
                                </div>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserAuthLayout>
    );
}
