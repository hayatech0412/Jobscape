import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import ArrowRight from '@/Components/Icons/ArrowRight';
import InputLabel from '@/Components/InputLabel';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Edit({
    bank_account,
}) {
    const type_options = ["普通預金", "当座預金"];

    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        bank_name: bank_account?.bank_name ?? '',
        account_type: bank_account?.account_type ?? '',
        account_code: bank_account?.account_code ?? '',
        shop_code: bank_account?.shop_code ?? '',
        account_last_name: bank_account?.account_last_name ?? '',
        account_first_name: bank_account?.account_first_name ?? '',
    });

    useEffect(() => {
        if (flash.bank_info) setData(flash.bank_info);
    }, [flash.bank_info]);

    const submit = (e) => {
        post(route('transfer.store'), {
            onFinish: () => {
            },
        });
    };    

    const handleBankNameSelect = (value) => {
        setData({...data, bank_name: value});
    };

    const handleAccountTypeSelect = (value) => {
        setData({...data, account_type: value});
    };

    return (
        <UserAuthMainLayout>        
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%] px-[4%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="text-[20px] mb-8">振込先口座</div>
                    <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-16 ">
                        <div className="mb-4">
                            <InputLabel className="mb-2" value="銀行" />
                            <TextInput
                                type="text"
                                name="bank_name"
                                value={data.bank_name}
                                className="mt-1 block w-full"
                                placeholder=""
                                onChange={(e) => setData({...data, bank_name: e.target.value})}
                            />
                            <InputError message={errors.bank_name} className="mt-2" />                            
                        </div>

                        <div className="mb-4">
                            <InputLabel className="mb-2" value="口座種別" />
                            <CustomSelect first=" " currentOption={data.account_type} className="w-full" options={type_options} onSelect={handleAccountTypeSelect} />
                            <InputError message={errors.account_type} className="mt-2" />   
                        </div>
                        
                        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-3 mb-4">
                            <div className="w-full md:w-[30%]">
                                <InputLabel className="mb-2" value="支店コード" />
                                <TextInput
                                    type="number"
                                    name="shop_code"
                                    value={data.shop_code}
                                    className="mt-1 block w-full"
                                    placeholder=""
                                    onChange={(e) => setData({...data, shop_code: e.target.value})}
                                />
                                <InputError message={errors.shop_code} className="mt-2" />                       
                            </div>

                            <div className="w-full md:w-[70%]">
                                <InputLabel className="mb-2" value="口座番号" />
                                <TextInput
                                    id="account_code"
                                    type="number"
                                    name="account_code"
                                    value={data.account_code}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData({...data, account_code: e.target.value})}
                                />
                                <InputError message={errors.account_code} className="mt-2" />                            
                                <div className="text-[12px] mt-2">※口座番号が7桁未満の場合は先頭に0をつけてください。</div>  
                            </div>
                        </div>

                        <div className="mb-4">
                            <InputLabel className="mb-2" value="口座名義(セイ)" />
                            <TextInput
                                id="account_last_name"
                                type="text"
                                name="account_last_name"
                                value={data.account_last_name}
                                className="mt-1 block w-full"
                                placeholder="例：ヤマダ"
                                onChange={(e) => setData({...data, account_last_name: e.target.value})}
                            />
                            <InputError message={errors.account_last_name} className="mt-2" />                       
                        </div>

                        <div className="mb-4">
                            <InputLabel className="mb-2" value="口座名義(メイ)" />
                            <TextInput
                                id="account_first_name"
                                type="text"
                                name="account_first_name"
                                value={data.account_first_name}
                                className="mt-1 block w-full"
                                placeholder="例：タロウ"
                                onChange={(e) => setData({...data, account_first_name: e.target.value})}
                            />
                            <InputError message={errors.account_first_name} className="mt-2" />                       
                        </div>

                        <div className="text-[12px] pb-4">
                            ※振込先が間違っている場合、再度振込手数料が発生します。<br />
                            ※登録された氏名と振込口座名義が一致しない場合、振込申請をすることができません。<br />
                            ※振込口座は御本人名義の口座のみご利用できます。口座名義が旧姓の場合は名義変更のうえ、改めれお手続きをお願いします。
                        </div>
                    </div> 


                    <Link className="border-b border-t border-gray-200 flex items-center justify-between h-16">
                        <div className="text-[14px]">振込先名義について</div>
                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                    </Link>
                    <Link className="border-b border-gray-200 flex items-center justify-between h-16 mb-4">
                        <div className="text-[14px]">氏名の変更をされた場合</div>
                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                    </Link>

                </div>

                <div className="text-center my-16">
                    <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                        次へ
                    </PrimaryButton>
                </div>
            </div>    
                    
        </UserAuthMainLayout>
    );
}
