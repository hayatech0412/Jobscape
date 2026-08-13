import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomRadioButtons from '@/Components/CustomRadioButtons';
import InputLabel from '@/Components/InputLabel';
import ArrowRight from '@/Components/Icons/ArrowRight';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Amount({
    profile
}) {
    const { flash, tax_deduction_threshold, withdrawal_rate } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        request_amount: 0,
        amount: 0,
        amount_fee: 500,
        tax_amount: 0
    });

    useEffect(() => {
        if (flash.amount_info) setData(flash.amount_info);
    }, [flash.amount_info]);

    const submit = (e) => {
        e.preventDefault();

        post(route('transfer.amount.store'), {
            onFinish: () => reset('password'),
        });
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    const handleRequestAmountChange = (e) => {
        if (e.target.value > tax_deduction_threshold) {
            const taxAmount = (e.target.value - tax_deduction_threshold) * withdrawal_rate;
            setData({...data, request_amount: e.target.value, tax_amount: taxAmount, amount: e.target.value - data.amount_fee - taxAmount})
            return;
        }

        setData({...data, request_amount: e.target.value, amount: e.target.value - data.amount_fee})
    }

    return (
        <UserAuthMainLayout>
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%] px-[4%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="text-[20px] mb-8">振込申請する</div>

                    <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-6 ">

                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 my-8 text-[14px] leading-none">
                            <div>現在の残高</div>                           
                            <div className="text-[16px] font-semibold">¥{formatNumber(profile.amount)}</div>                           
                        </div>

                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <InputLabel className="mb-2" value="振込申請金額" />
                            <div className="relative">
                                <TextInput
                                    id="request_amount"
                                    type="number"
                                    name="request_amount"
                                    value={data.request_amount}
                                    inputMode="numeric"
                                    className="mt-1 block w-full text-right"
                                    onChange={handleRequestAmountChange}
                                />
                                <span className="text-[14px] absolute top-3 left-3">¥</span>
                            </div>
                            <InputError message={errors.request_amount} className="mt-2" />       
                            <div className="text-[12px] mt-2 mb-4">※申請金額は振込手数料を除いた¥800から可能です。</div>  
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4 text-[14px]">
                            <div>源泉徴収額</div>                           
                            <div>¥{formatNumber(data.tax_amount)}</div>                           
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4 text-[14px]">
                            <div>振込手数料</div>                           
                            <div>¥{formatNumber(data.amount_fee)}</div>                           
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8 text-[14px]">
                            <div>振込金額</div>                           
                            <div>¥{formatNumber(data.amount)}</div>                           
                        </div>
                    </div> 
                    
                    
                    <Link className="border-b border-t border-gray-200 flex items-center justify-between h-16 mt-16">
                        <div className="text-[14px]">振込可能額について</div>
                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                    </Link>
                    <Link className="border-b border-gray-200 flex items-center justify-between h-16 mb-4">
                        <div className="text-[14px]">振込スケジュールについて</div>
                        <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                    </Link>
                </div>


                <div className="text-center mt-12">
                    <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                        次へ
                    </PrimaryButton>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
