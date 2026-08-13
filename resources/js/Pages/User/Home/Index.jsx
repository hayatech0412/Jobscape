import React, { useState } from 'react';
import FilterButton from '@/Components/FilterButton';
import ProductSortButton from '@/Components/ProductSortButton';
import RewardFilterButton from '@/Components/RewardFilterButton';
import ReloadIcon from '@/Components/Icons/ReloadIcon';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ProductList from '@/Components/ProductList';
import PickupProductList from '@/Components/PickupProductList';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import FeaturedContentsList from '@/Components/FeaturedContentsList';
import ProductCard from '@/Components/Users/ProductCard';
import Pagination from '@/Components/Pagination';

export default function Index({
    profile,
    all_products,
    high_rate_products,
    interested_products,
    pickup_products,
    realtime_products,
    expiring_products,
    products_filter_types,
    products_sort_types,
    reward_filter_type,
    sort,
    filter
}) {
    const { data, setData, post, get, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('transfer'), {
            onFinish: () => reset('password'),
        });
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    return (
        <UserAuthMainLayout>
            <div className="grow w-[100%] mb-[200px]">
                <div className="w-full overflow-hidden">
                    <img src="/assets/images/firstview.png" alt="Phone" className="hidden md:block w-full object-cover" />
                    <img src="/assets/images/firstview_sp.png" alt="Phone" className="block md:hidden w-full object-cover" />
                </div>

                <div className="ml-[8%] md:ml-[4%] mb-6 -mt-[75px] md:-mt-[100px] overflow-y-visible">
                    <div className="flex gap-3 md:w-[580px] p-[6px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                        <div className="relative w-[300px] h-[150px] md:w-[66%] md:h-[180px] border border-gray-200 shadow-md bg-white rounded-lg py-[12px] md:py-[3%] px-[3%]">
                            <Link className='flex items-center justify-end text-right text-[12px] gap-2 mb-1'>
                                <span>2024/06/24 06:30</span>
                                <ReloadIcon className="w-[11px] h-[11px]" />
                            </Link>
                            <div className="flex flex-col justify-between h-[86%]">
                                <div className="text-[12px]">残高</div>
                                <div className="leading-none flex items-end">
                                    <div className="text-[14px] pb-[2px]">¥</div>
                                    <div className="text-[28px] font-semibold">{formatNumber(profile.amount)}</div>
                                </div>
                                <div className="text-[12px]">今月の売上 <span className="text-[14px]">¥{formatNumber(profile.month_amount)}</span></div>
                                <div className="flex items-center justify-center gap-2 leading-none bg-white rounded-full h-6">
                                    <div className="text-[12px] gap-2 text-gray-600 flex items-center">
                                        <div>2024/12/31 有効期限</div>
                                        <div className="group relative flex justify-center">
                                            <div className="relative w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center leading-none text-[12px]">
                                                ?
                                            </div>
                                            <div className="absolute leading-5 z-20 -right-16 top-8 w-[310px] p-4 scale-0 transition-all rounded-sm bg-[#3370ff] text-xs text-white group-hover:scale-100 font-semibold ">
                                                <span className="w-[16px] right-[66px] h-[10px] border border-t-0 border-b-[10px] border-b-[#3370ff] border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent absolute -top-[10px]"></span>
                                                期間を過ぎた売上金は自動的に振込されます。お振込先が確認できない場合消失する場合がありますのでご注意ください。詳細は<Link className="underline">こちら</Link>
                                            </div>
                                        </div>
                                        <div>|</div>
                                    </div>
                                    <span className="text-[14px] text-red-600">¥33,500</span>
                                </div>
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-center w-[300px] h-[150px] md:w-[40%] md:h-[180px] border border-gray-200 shadow-md relative bg-white rounded-lg p-[3%]">
                            <div className="flex flex-col justify-center gap-2 md:gap-4 pr-4 border-r border-gray-200">
                                <div className="text-[12px] mb-1 flex items-center space-x-2">
                                    <div className="text-[12px]">総保有ポイント</div>
                                    <div className="w-4 h-4 rounded-full bg-[#e45e16] text-white flex items-center justify-center leading-none text-[12px]">P</div>
                                </div>
                                <div className="leading-none flex items-end">
                                    <div className="text-[24px] md:text-[28px] font-semibold mr-2">155,000</div>
                                    <div className="text-[14px] pb-[2px]">pt</div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-2 md:gap-4 pl-4 ">
                                <div className="text-[12px] mb-1 flex items-center space-x-2">
                                    <div className="text-[12px]">JOB's コイン</div>
                                    <div className="w-4 h-4 rounded-full bg-[#f5db06] flex items-center justify-center leading-none text-[12px]">C</div>
                                </div>
                                <div className="leading-none flex items-end">
                                    <div className="text-[24px] md:text-[28px] font-semibold mr-2">155,000</div>
                                    <div className="text-[14px] pb-[2px]">coins</div>
                                </div>
                            </div>
                        </div> */}

                        <div className="hidden md:flex justify-center items-center w-[300px] h-[150px] md:w-[33%] md:h-[180px] shadow-md border border-[#3370ff] rounded-lg relative bg-white p-[10px] md:p-[2%]">
                            <div className="flex flex-col items-center gap-2 md:gap-4">
                                <div className="text-[10px] md:text-[12px]">あなたの現在のランクは</div>
                                <div className="text-[12px] md:text-[14px] text-[#3370ff]">べシック</div>
                                <button className="rounded-full h-8 w-28 bg-[#3370ff] text-white text-[10px]">ランクアップする</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:hidden flex justify-center items-center w-[92vw] mx-auto mb-4 border border-[#3370ff] rounded-lg relative bg-white p-[10px] md:p-[2%]">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="text-[12px]">あなたのランクは</div>
                        <div className="text-[14px] text-[#3370ff]">べシック</div>
                        <button className="rounded-full h-8 w-28 bg-[#3370ff] text-white text-[10px]">ランクアップする</button>
                    </div>
                </div>
                <div className="w-[92%] mx-auto">
                    <div className={`mt-3 bg-white rounded-lg px-4 md:px-8 pb-8 md:pb-20 mb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]`}>

                        <div className='grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4 pt-8'>
                            {all_products.data.map((product, index) => (
                                <ProductCard key={"product" + index} product={product} />
                            ))}
                        </div>
                        {
                            all_products.data.length == 0 ? (
                                <div className="text-[16px] text-center">検索結果がありません。</div>
                            ) : (<></>)
                        }
                        { all_products.last_page > 1 && <Pagination page={all_products.current_page} last_page={all_products.last_page} setPage={page => fetch({ page: page })} /> }
                    </div>
                </div>

                {/* <div className="w-[92%] mx-auto">
                    <div className="max-w-[92vw] flex justify-between mb-3 items-end">
                        <RewardFilterButton reward_filter_type={reward_filter_type} />
                        <div className="text-[12px] flex items-center gap-2">
                            <ProductSortButton options={products_sort_types} defaultValue={sort} />
                            <FilterButton options={products_filter_types} defaultValue={filter} />
                        </div>
                    </div>

                    <div
                        className="w-[96vw] md:w-full bg-white md:border border-gray-200
                                    shadow-md font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none
                                    md:rounded-br-lg md:rounded-tr-lg   py-[36px] mb-6 "
                    >
                        <div className="w-[96%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0 pr-[4%]">
                                <div className="font-semibold text-[18px] md:text-[20px]">紹介料利率の高い商材</div>
                                <Link className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>

                            {
                                high_rate_products.length > 0 ? (
                                    <ProductList id="highrate" products={high_rate_products} />
                                ) : (
                                    <div className="text-center text-[16px] font-normal">
                                        商材はありません。
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div
                        className="hidden md:block w-[96vw] md:w-full bg-white md:border border-gray-200
                                    shadow-md font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none
                                    md:rounded-br-lg md:rounded-tr-lg   py-[36px] mb-6 "
                    >
                        <div className="w-[96%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0 pr-[4%]">
                                <div className="font-semibold text-[18px] md:text-[20px]">興味がありそうな商材</div>
                                <Link className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>
                            {
                                interested_products.length > 0 ? (
                                    <ProductList id="interested" products={interested_products} />
                                ) : (
                                    <div className="text-center text-[16px] font-normal">
                                        商材はありません。
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div
                        className="w-full bg-white md:border border-gray-200
                                    shadow-md font-semibold rounded-lg   py-[36px] mb-6 "
                    >
                        <div className="w-[92%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <div className="font-semibold text-[18px] md:text-[20px]">あなたにおすすめのキーワード</div>
                            </div>

                            <div className="flex flex-wrap items-start justify-start gap-2">
                                <Link className="leading-none text-[12px] bg-[#d8e3fa] rounded-full px-[20px] py-[10px] text-[#3370ff] border border-[#3370ff]">東京都</Link>
                                <Link className="leading-none text-[12px] rounded-full px-[20px] py-[10px] border border-gray-200">キーワード入力</Link>
                                <Link className="leading-none text-[12px] rounded-full px-[20px] py-[10px] border border-gray-200">キーワード入力</Link>
                                <Link className="leading-none text-[12px] rounded-full px-[20px] py-[10px] border border-gray-200">キーワード入力</Link>
                                <Link className="leading-none text-[12px] rounded-full px-[20px] py-[10px] border border-gray-200">キーワード入力</Link>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-[96vw] md:w-full bg-white md:border border-gray-200
                                    shadow-md font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none
                                    md:rounded-br-lg md:rounded-tr-lg   py-[36px] mb-28 md:mb-6 "
                    >
                        <div className="w-[96%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex gap-1 items-center justify-end leading-none mb-1 pr-[4%] text-gray-400">
                                <div className="text-[12px] flex items-center justify-center">広告</div>
                                <div className="flex text-[12px] px-[5px] py-[3px] border border-gray-200 rounded-md">AD</div>
                            </div>
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0 pr-[4%]">
                                <div className="font-semibold text-[18px] md:text-[20px]">ピックアップ</div>
                                <Link className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>
                            {
                                pickup_products.length > 0 ? (
                                    <PickupProductList id="pickup" products={pickup_products} />
                                ) : (
                                    <div className="text-center text-[16px] font-normal">
                                        商材はありません。
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div
                        className="hidden md:block w-[96vw] md:w-full bg-white md:border border-gray-200
                                    shadow-md font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none
                                    md:rounded-br-lg md:rounded-tr-lg py-[36px] mb-6 "
                    >
                        <div className="w-[96%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0 pr-[4%]">
                                <div className="font-semibold text-[18px] md:text-[20px]">リアルタイム人気商材</div>
                                <Link className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-start justify-start gap-2 mb-6">
                                <Link className="leading-none text-[12px] bg-[#d8e3fa] rounded-full px-[20px] py-[10px] text-[#3370ff] border border-[#3370ff]">東京都</Link>
                                <Link className="leading-none text-[12px] rounded-full px-[20px] py-[10px] border border-gray-200">キーワード入力</Link>
                                <Link className="leading-none text-[12px] rounded-full px-[20px] py-[10px] border border-gray-200">キーワード入力</Link>
                                <Link className="leading-none text-[12px] rounded-full px-[20px] py-[10px] border border-gray-200">キーワード入力</Link>
                            </div>
                            {
                                realtime_products.length > 0 ? (
                                    <ProductList id="realtime" products={realtime_products} />
                                ) : (
                                    <div className="text-center text-[16px] font-normal">
                                        商材はありません。
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div
                        className="hidden md:block w-[96vw] md:w-full bg-white md:border border-gray-200
                                    shadow-md font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none
                                    md:rounded-br-lg md:rounded-tr-lg py-[36px] mb-6 "
                    >
                        <div className="w-[96%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0 pr-[4%]">
                                <div className="font-semibold text-[18px] md:text-[20px]">掲載期間終了間近の商材</div>
                                <Link className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>
                            {
                                expiring_products.length > 0 ? (
                                    <ProductList id="expire" products={expiring_products} />
                                ) : (
                                    <div className="text-center text-[16px] font-normal">
                                        商材はありません。
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    <div
                        className="hidden md:block w-[96vw] md:w-full bg-white md:border border-gray-200
                                    shadow-md font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none
                                    md:rounded-br-lg md:rounded-tr-lg py-[36px] mb-6 "
                    >
                        <div className="w-[96%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0 pr-[4%]">
                                <div className="font-semibold text-[18px] md:text-[20px]">注目のコンテンツ</div>
                                <Link className="flex gap-1 items-center">
                                    <ArrowRight className="size-4"></ArrowRight>
                                    <div className="text-[12px]">もっと見る</div>
                                </Link>
                            </div>

                            <FeaturedContentsList id="featured" contents={interested_products} />
                        </div>
                    </div>

                </div> */}

            </div>
        </UserAuthMainLayout>
    );
}
