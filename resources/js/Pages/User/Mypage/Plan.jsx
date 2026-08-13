import React, { useState, useEffect } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import ProductRowItem from '@/Components/Users/ProductRowItem';
import { Link, useForm, usePage } from '@inertiajs/react';
import CustomSelect from '@/Components/CustomSelect';
import ArrowRight from '@/Components/Icons/ArrowRight';

export default function Plan({
    plan,
    profile,
    plans,
}) {
    const {auth} = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        category_ids: '',
    });

    const toggleActive = () => {
        post(route('mypage.active'));
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }
    
    return (
        <UserAuthMainLayout>            
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="mb-6">
                            <div className="text-[20px] mb-8 font-bold">現在のプラン</div>
                            <div className="flex items-center justify-between">
                                <div className="text-[16px]">{ plan.name }</div>
                                <div className="text-[14px] text-[#3370ff] cursor-pointer">プランをアップグレード</div>
                            </div>
                        </div>
                        <div className="pb-8 border-b border-gray-200">
                            一番人気「スタンダードプラン」は、商材を紹介して得られる報酬利率が提示額の100％と最も高く設定されており、効率的に収益を上げることが可能です。<br />
                            詳細は料金プランページをご確認ください。<Link href={route('payments.plan.change')} className="text-[#3370ff]">料金プラン</Link>
                        </div>
                        <div className="py-4 flex justify-between border-b border-gray-200">
                            <div className="flex flex-col gap-1">
                                <div className="text-[14px]">お支払時間</div>
                                <div className="text-[12px] text-gray-400">{plan.type == 1 ? '月間プラン' : '年間プラン'}</div>
                            </div>
                            <div className="w-[60%] flex items-center">
                                {/* <CustomSelect currentOption={plan.type} className="w-full" options={plans} onSelect={handlePlanTypeSelect} /> */}
                                <div className="text-[14px]">
                                    ¥{formatNumber(plan.amount)} / {plan.type == 1 ? '月' : '年'}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-6 border-b border-gray-200 mb-4 md:mb-20">
                            <div className="text-[14px]">
                                利用を{ auth.user.status == 1 ? '停止' : '再開' }する
                            </div>
                            <div onClick={toggleActive} className="text-[14px] text-[#3370ff] cursor-pointer">アカウントを{ auth.user.status == 1 ? '休止' : '再開' }する</div>
                        </div>

                        <Link className="border-b border-t border-gray-200 flex items-center justify-between h-16">
                            <div className="text-[14px]">プラン変更について</div>
                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                        </Link>
                    </div>
                    
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
