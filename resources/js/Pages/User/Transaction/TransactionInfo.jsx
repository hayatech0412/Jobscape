import React, { useState } from 'react';
import ShieldWithCheck from '@/Components/Icons/ShieldWithCheck';
import ArrawRight from '@/Components/Icons/ArrowRight';
import { Head, Link, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Index({
    product,
    plan,
    RewardTypes,
    company,
    transaction
}) {
    console.log(transaction)
    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    function formatDate(dateString) {
        if (dateString) {
            return dayjs(dateString).format("YYYY年MM月DD日");
        } else {
            return '';
        }
    }

    return (
        <div className="w-full md:w-[320px] hidden md:block">
            <div className="text-[18px] mb-6 ">取引情報</div>

            <div className="bg-white px-6 py-8 rounded-md mb-6 md:mb-0  shadow-md">
                <div className="text-[12px] mb-4 pb-6 border-b border-gray-200">

                    <Link href={route('search.show', [product.id])} className="flex items-center space-x-4 mb-6">
                        <img
                            src={product.main_image}
                            alt="Product"
                            className="block min-w-24 w-24 h-16 object-cover"
                        />
                        <div className="flex items-center justify-between grow gap-1">
                            <div className="line-clamp-2">
                                {product.overview}
                            </div>
                            <ArrawRight />
                        </div>
                    </Link>
                    {
                        product.reward_type == RewardTypes.PERCENT ?
                        (
                            <div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="block w-28">
                                        確定取引額
                                    </div>
                                    { !transaction || transaction?.bill_amount == 0 ?                                     
                                        <div className="grow">未定</div> :
                                        <div className="grow">¥{formatNumber(transaction?.total_amount)}</div>
                                    }
                                </div>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="block w-28">
                                        提示報酬率
                                    </div>
                                    <div className="grow">{product.reward_amount}%</div>
                                </div>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="block w-28">
                                        基本紹介手数料
                                    </div>
                                    { !transaction || transaction?.bill_amount == 0 ?                                     
                                        <div className="grow">未定</div> :
                                        <div className="grow">¥{formatNumber(Math.round(transaction?.bill_amount))}</div>
                                    }
                                </div>

                                <div className="flex space-x-4 mb-4">
                                    <div className="block w-28">
                                        プラン報酬利率
                                    </div>
                                    <div className="grow">
                                        <div>{plan.reward_rate}%</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="block w-28">
                                        確定報酬
                                    </div>
                                    { !transaction || transaction?.bill_amount == 0 ?                                     
                                        <div className="grow">未定</div> :
                                        <div className="grow">¥{formatNumber(Math.round(transaction?.bill_amount * plan.reward_rate / 100))}</div>
                                    }
                                </div>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 w-28">
                                            <div className="block w-28">
                                                取引完了目案日
                                            </div>
                                            <div className="group relative flex justify-center">
                                                <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center leading-none text-[12px]">?</div>
                                                <div className="absolute z-20 leading-5 -left-[76px] top-8 w-[320px] px-4 py-3 scale-0 transition-all rounded-sm bg-[#3370ff] text-xs text-white group-hover:scale-100 font-semibold ">
                                                    <span className="w-[16px] left-[78px] h-[10px] border border-t-0 border-b-[10px] border-b-[#3370ff] border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent absolute -top-[10px]"></span>
                                                    取引の状況に応じて完了目案日が変更となった場合、こちらに再表示されます。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grow">{formatDate(transaction?.proposed_at)}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 w-full">
                                    <div className="flex items-center space-x-2 w-28">
                                        <div>取引ID</div>
                                    </div>
                                    <div className="">{transaction?.code}</div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="block w-28">
                                        基本紹介料
                                    </div>
                                    <div className="grow">¥{formatNumber(product.reward_amount)}</div>
                                </div>

                                <div className="flex space-x-4 mb-4">
                                    <div className="block w-28">
                                        プラン報酬利率
                                    </div>
                                    <div className="grow">
                                        <div>{plan.reward_rate}%</div>
                                    </div>
                                </div>

                                <div className="flex space-x-4 mb-4">
                                    <div className="block w-28">
                                        確定報酬
                                    </div>
                                    { !transaction || transaction?.bill_amount == 0 ?                                     
                                        <div className="grow">未定</div> :
                                        <div className="grow">¥{formatNumber(Math.round(transaction?.bill_amount * plan.reward_rate / 100))}</div>
                                    }
                                </div>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="block w-28">
                                        取引完了目案日
                                    </div>
                                    <div className="grow">{formatDate(transaction?.proposed_at)}</div>
                                </div>

                                <div className="flex items-center space-x-4 w-full">
                                    <div className="flex items-center space-x-2 w-28">
                                        <div>取引ID</div>
                                    </div>
                                    <div className="">{transaction?.code}</div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <Link href='/' className="flex items-center justify-between text-[12px] mb-4 pb-4 border-b border-gray-200">
                    <div className="">
                        <div className="flex items-center space-x-4">
                            <img
                                src={company.user.avatar_url}
                                alt="Profile"
                                className="block rounded-full w-10 h-10 object-cover"
                            />
                            <div className="">
                                {company.nickname}
                                {
                                    company.regist_step == 4 ?
                                    <div className="flex items-center gap-1 text-[10px]">
                                        <ShieldWithCheck className={"w-4 h-6"} />
                                        <span className="text-gray-700">法人認証済</span>
                                    </div> : <div className="flex items-center gap-1 text-[10px]">
                                        <span className="text-gray-700">法人未認証</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
