import React, { useState, useEffect } from 'react';
import ReloadIcon from '@/Components/Icons/ReloadIcon';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ProductList from '@/Components/ProductList';
import ShieldWithCheck from '@/Components/Icons/ShieldWithCheck';
import EnvelopIcon from '@/Components/Icons/EnvelopIcon';
import ChatIcon from '@/Components/Icons/ChatIcon';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import BookIcon from '@/Components/Icons/BookIcon';

export default function Index({
    profile,
    now,
    visited_prodcuts,
    notices,
    plan,
}) {
    const { data, setData, post, get, processing, errors, reset } = useForm({
    });

    const {auth} = usePage().props;

    const submit = (e) => {
        e.preventDefault();

        get(route('transfer'), {
            onFinish: () => reset('password'),
        });
    };

    const fetch = () => {
        get(route('mypage'));
    }

    useEffect(() => {
        // fetch();
    }, []);

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    const formatDate = (dateString) => {
        return dayjs(dateString).format("YYYY/MM/DD");
    };

    return (
        <UserAuthMainLayout>
            <div className="grow pt-12 mb-32">
                <div className="ml-[4%] w-[92%] ">

                    <div className="sm:flex justify-between items-center bg-white border border-gray-200 shadow-md rounded-lg px-[3%] py-[3%] mb-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={auth.user.avatar_url}
                                alt="Pofile"
                                className="w-16 h-16 rounded-full object-cover" />
                            <div className="flex flex-col gap-1">
                                <div className="text-[14px] md:text-[20px] font-semibold flex items-center gap-2">
                                    <span className="line-clamp-1">{profile.nickname}</span>
                                    <ArrowRight className="size-4"/>
                                </div>
                                <div className={(profile.sms_verified_at ? 'gap-3 ' : 'gap-0') + " flex items-center leading-none"}>
                                    {
                                        profile.sms_verified_at ? (
                                            <div className="flex items-center text-[12px] pt-[4px]">
                                                <ShieldWithCheck className={"w-5 h-6"} />
                                                <span className="text-gray-700">本人確認済み</span>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                    <div className="text-[13px] text-[#3370ff]">{plan.name}</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link href={route('payments.plan')} className="mx-auto leading-none md:ml-0 text-[12px] rounded-full px-3 py-2 text-white bg-[#3370ff]">
                                プラン変更する
                            </Link>
                        </div>
                    </div>

                    <div className=" bg-white border border-gray-200 shadow-md rounded-lg px-[3%] py-[3%] mb-6">
                        <Link className='flex items-center justify-end text-right text-[12px] gap-2 mb-4'>
                            <span>{ dayjs(now).format('YYYY/MM/DD HH:mm')} 現在</span>
                            <ReloadIcon className="w-3 h-3" />
                        </Link>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="h-28 relative flex items-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="ml-4">
                                    <div className="text-[14px] mb-1">残高</div>
                                    <div className="text-[30px] font-semibold">¥{ formatNumber(profile.amount) }</div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="h-28 relative flex items-center pl-6 bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                    <div className="flex flex-col">
                                        <div className="text-[12px] mb-1">今月の売上</div>
                                        <div className="text-[24px] font-semibold">¥{formatNumber(profile.month_amount)}</div>
                                    </div>
                                    <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                                </div>
                                <div className="h-28 relative flex items-center pl-6 bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                    <div className="flex flex-col">
                                        <div className="text-[12px] mb-1 flex items-center leading-none gap-2">
                                            <span className="text-red-500">2024/12/31 有効期限 </span>
                                            <div className="group relative flex justify-center">
                                                <div className="relative w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center leading-none text-[12px]">
                                                    ?
                                                </div>
                                                <div className="absolute leading-5 z-20 -right-16 top-8 w-[310px] p-4 scale-0 transition-all rounded-sm bg-[#3370ff] text-xs text-white group-hover:scale-100 font-semibold ">
                                                    <span className="w-[16px] right-[66px] h-[10px] border border-t-0 border-b-[10px] border-b-[#3370ff] border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent absolute -top-[10px]"></span>
                                                    期間を過ぎた売上金は自動的に振込されます。お振込先が確認できない場合消失する場合がありますのでご注意ください。詳細は<Link className="underline">こちら</Link>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="text-[24px] font-semibold">¥35,000</div>
                                    </div>
                                    <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* <div className="h-28 relative flex items-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="ml-4">
                                    <div className="text-[12px] mb-1">総保有ポイント</div>
                                    <div className="text-[24px] font-semibold">500 pt</div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="h-28 relative flex items-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="ml-4">
                                    <div className="text-[12px] mb-1 flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-[#f5db06] flex items-center justify-center leading-none text-[12px]">C</div>
                                        <div>総保有コイン</div>
                                        <div className="group relative flex justify-center">
                                            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center leading-none text-[12px]">?</div>
                                            <div className="absolute z-20 -right-56 top-8 w-[320px] px-4 py-3 scale-0 transition-all rounded-sm bg-[#3370ff] text-xs text-white group-hover:scale-100 font-semibold ">
                                                <span className="w-[16px] left-[78px] h-[10px] border border-t-0 border-b-[10px] border-b-[#3370ff] border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent absolute -top-[10px]"></span>
                                                サイト内商品購入や寄付に使用することができます。
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[24px] font-semibold">1,000 coins</div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div> */}

                        </div>

                        <div className="bg-white border border-gray-200 shadow-md rounded-lg">
                            <div className="w-[90%] max-w-[1000px] mx-auto py-8">
                                <Link className="border-b border-gray-200 flex items-center justify-between h-16">
                                    <div className="text-[14px]">今月の売上について</div>
                                    <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                                </Link>
                                <Link className="border-b border-gray-200 flex items-center justify-between h-16">
                                    <div className="text-[14px]">売上金の有効期間とは</div>
                                    <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                                </Link>
                                {/* <Link className="border-b border-gray-200 flex items-center justify-between h-16">
                                    <div className="text-[14px]">ポイントのため方（準備中）</div>
                                    <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                                </Link>
                                <Link className="border-b border-gray-200 flex items-center justify-between h-16">
                                    <div className="text-[14px]">JOB'sコインとは（準備中）</div>
                                    <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                                </Link> */}
                            </div>
                        </div>
                    </div>

                    <div className=" bg-white border border-gray-200 shadow-md rounded-lg px-[3%] py-[3%] mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-end leading-none mb-4">
                                <div className="font-semibold text-[20px] mr-8">紹介した案件</div>
                                <div className="font-semibold text-[28px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(auth.user.profile.transaction_total_count) }</div>
                                <div className="font-semibold text-[14px]">件</div>
                            </div>

                            <Link href={route('transactions')} className="flex gap-1 items-center">
                                <ArrowRight className="size-4"></ArrowRight>
                                <div className="text-[12px]">取引履歴を見る</div>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                            <div className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="flex flex-col items-center">
                                    <div className="text-[14px] font-semibold mb-2">フォーム送信</div>
                                    <div className="flex items-end leading-none">
                                        <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(auth.user.profile.transaction_requested_count) }</div>
                                        <div className="font-semibold text-[12px]">件</div>
                                    </div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="flex flex-col items-center">
                                    <div className="text-[14px] font-semibold mb-2">商談中</div>
                                    <div className="flex items-end leading-none">
                                        <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(auth.user.profile.transaction_responding_count) }</div>
                                        <div className="font-semibold text-[12px]">件</div>
                                    </div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="flex flex-col items-center">
                                    <div className="text-[14px] font-semibold mb-2">成立</div>
                                    <div className="flex items-end leading-none">
                                        <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(auth.user.profile.transaction_accepted_count) }</div>
                                        <div className="font-semibold text-[12px]">件</div>
                                    </div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="flex flex-col items-center">
                                    <div className="text-[14px] font-semibold mb-2">不成立</div>
                                    <div className="flex items-end leading-none">
                                        <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(auth.user.profile.transaction_rejected_count) }</div>
                                        <div className="font-semibold text-[12px]">件</div>
                                    </div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="flex flex-col items-center">
                                    <div className="text-[14px] font-semibold mb-2">完了</div>
                                    <div className="flex items-end leading-none">
                                        <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(auth.user.profile.transaction_complete_count) }</div>
                                        <div className="font-semibold text-[12px]">件</div>
                                    </div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-[96vw] md:w-full bg-white md:border border-gray-200
                                    md:shadow-md rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none
                                    md:rounded-br-lg md:rounded-tr-lg py-[36px] mb-6 "
                    >
                        <div className="w-[96%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0 pr-[4%]">
                                <div className="font-semibold text-[18px] md:text-[20px]">閲覧履歴</div>
                                <Link className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>
                            { visited_prodcuts.data.length > 0 ? (
                                <ProductList id="visit_history" products={visited_prodcuts.data} />
                            ) : (
                                <div className="text-[16px] text-center">閲覧履歴がありません。</div>
                            ) }
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-md rounded-lg py-4 mb-6">
                        <div className="w-[90%] max-w-[1000px] mx-auto py-8">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0">
                                <div className="font-semibold text-[18px] md:text-[20px]">お知らせ</div>
                                <Link href={route('notices')} className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>
                            { notices.data.length > 0 ? (
                                notices.data.map((notice) => (
                                    <div key={"notice" + notice.id} className="border-b border-gray-200 flex items-center h-12">
                                        <div className="text-[14px] text-gray-400 mr-[4%]">{ formatDate(notice.created_at)}</div>
                                        <p className="text-[14px] whitespace-pre-wrap">{ notice.content }</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-[16px] text-center">お知らせがありません。</div>
                            ) }
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-md rounded-lg py-4 mb-6">
                        <div className="w-[90%] max-w-[1000px] mx-auto py-8">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0">
                                <div className="font-semibold text-[18px] md:text-[20px]">JOBSCAPEを知る</div>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Link className="w-1/3 gap-1 rounded-lg border border-gray-200 flex flex-col justify-center h-28 px-6">
                                    <div className="text-[14px]"><BookIcon className="size-8" /></div>
                                    <div className="text-[14px]">使い方を学ぶ</div>
                                </Link>
                                <Link href={route('contact')} className="w-1/3 gap-2 rounded-lg border border-gray-200 flex flex-col justify-center h-28 px-6">
                                    <div className="text-[14px]"><EnvelopIcon className="size-6" /></div>
                                    <div className="text-[14px]">お問い合わせ</div>
                                </Link>
                                <Link href={route('opinion')} className="w-1/3 gap-2 rounded-lg border border-gray-200 flex flex-col justify-center h-28 px-6">
                                    <div className="text-[14px]"><ChatIcon className="size-7" /></div>
                                    <div className="text-[14px]">ご意見箱</div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </UserAuthMainLayout>
    );
}
