import React, { useEffect, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ArrowLeft from '@/Components/Icons/ArrowLeft';


export default function MypageSideBar({ className }) {
    const { url } = usePage(); // Get the current URL
    const isMypage = url === '/mypage';
    const [isClosed, setIsClosed] = useState(false);
    const { post } = useForm();

    useEffect(() => {
        
    }, []);

    const logout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const toggleSidebar = () => {
        setIsClosed(!isClosed);
    };

    return (
        <div className={`bg-white hidden md:flex border-r border-gray-200 ${className || ''}`}>
            {/* Sidebar */}
            <div
                className={`${
                    isClosed ? 'w-0 opacity-0 p-0' : 'w-[280px] pl-6 pr-6'
                } pt-6 transition-all duration-200 ease-in-out overflow-hidden`}
                aria-hidden={isClosed}
            >
                
                <div className={ url.includes('/mypage/') || url.includes('/transactions')  ? "hidden" : ""}>
                    <div className="mb-6">
                        <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">取引管理</div>
                        <div className="flex flex-col text-[13px]">
                            <Link 
                                href={route('transactions')} 
                                className={(url.includes('/transactions') ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                                取引履歴
                            </Link>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">残高管理</div>
                        <div className="flex flex-col text-[13px] pl-2">
                            <Link href={route('transactions.balance.history')}  className="flex items-center py-3">
                                残高履歴
                            </Link>
                            <Link href={route('transfer.amount')} className="flex items-center py-3">
                                振込申請
                            </Link>
                            {/* <Link href="/" className="flex items-center py-2">
                                ポイント履歴
                            </Link> */}
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">設定</div>
                        <div className="flex flex-col text-[13px] pl-2">
                            <Link href={route('account.info')} className="flex items-center py-3">
                                本人情報設定
                            </Link>
                            <Link href={route('payments.plan')} className="flex items-center py-3">
                                プランの管理
                            </Link>
                            {/* <Link href="/" className="flex items-center py-3">
                                お知らせ・機能設定
                            </Link> */}
                        </div>
                    </div>
                </div>

                <div className={(url.includes('/transactions') ? "" : "hidden")}>
                    <div className="mb-6">
                        <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">取引管理</div>
                        <div className="flex flex-col text-[13px]">
                            <Link 
                                href={route('transactions')} 
                                className={(url.includes('/transactions') ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                                取引履歴
                            </Link>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">残高管理</div>
                        <div className="flex flex-col text-[13px] pl-2">
                            <Link href={route('transactions.balance.history')}   className="flex items-center py-3">
                                残高履歴
                            </Link>
                            <Link href={route('transfer.amount')} className="flex items-center py-3">
                                振込申請
                            </Link>
                            {/* <Link href="/" className="flex items-center py-2">
                                ポイント履歴
                            </Link> */}
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">設定</div>
                        <div className="flex flex-col text-[13px] pl-2">
                            <Link href={route('account.info')} className="flex items-center py-3">
                                本人情報設定
                            </Link>
                            <Link href={route('payments.plan')} className="flex items-center py-3">
                                プランの管理
                            </Link>
                            {/* <Link href="/" className="flex items-center py-3">
                                お知らせ・機能設定
                            </Link> */}
                        </div>
                    </div>
                </div>

                <div className={(url.includes('/transfer') ? "" : "hidden") + " mb-6"}>
                    <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">振込申請</div>
                    <div className="flex flex-col text-[13px]">
                        <Link 
                            href={route('transfer.amount')} 
                            className={(url.includes('/transfer/amount') ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                            振込申請する
                        </Link>
                        <Link 
                            href={route('transfer')} 
                            className={(url.includes('/transfer/info') ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                            振込口座
                        </Link>
                    </div>
                </div>

                <div className={(url.includes('/account') ? "" : "hidden") + " mb-6"}>
                    <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">本人情報設定</div>
                    <div className="flex flex-col text-[13px]">
                        <Link 
                            href={route('account.info')} 
                            className={(route('account.info').includes(url) ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                            アカウント情報
                        </Link>
                        <Link 
                            href={route('account.business')} 
                            className={(route('account.business').includes(url) ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                            本人情報・事業者情報
                        </Link>
                    </div>
                </div>

                <div className={(url.includes('/payments') ? "" : "hidden") + " mb-6"}>
                    <div className="text-[14px] mb-2 pb-2 border-b border-gray-200 font-semibold">プランの管理</div>
                    <div className="flex flex-col text-[13px]">
                        <Link 
                            href={route('payments.plan')} 
                            className={(route('payments.plan').includes(url) ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                            現在のプラン
                        </Link>
                        <Link 
                            href={route('payments.methods')} 
                            className={(route('payments.methods').includes(url) ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                            お支払い
                        </Link>
                    </div>
                </div>
                {
                    isMypage ? (
                        <>
                            <div className="mb-6">
                                <div className="text-[14px] mb-4 pb-2 border-b border-gray-200 font-semibold">ヘルプ</div>
                                <div className="flex flex-col text-[13px]">
                                    <Link 
                                        href={route('privacy')} 
                                        className={(url.includes('/privacy') ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                                        利用規約
                                    </Link>
                                    <Link 
                                        href={route('contact')} 
                                        className={(url.includes('/contact') ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                                        お問い合わせ
                                    </Link>
                                    <Link 
                                        href={route('help')} 
                                        className={(url.includes('/help') ? 'bg-gray-100 ' : ' ') + "flex items-center py-3 pl-2"}>
                                        ヘルプセンター
                                    </Link>
                                </div>
                            </div>
                            <div className="mb-8">
                                <div className="text-[14px] mb-4 pb-2 font-semibold">
                                    <Link onClick={logout} className="flex items-center">
                                        ログアウト
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : ''
                }
                    
            </div>

            {/* Toggle Button */}
            <div className="relative">
                <button
                    onClick={toggleSidebar}
                    className="fixed top-[45vh] -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                    role="button"
                    aria-expanded={!isClosed}
                    aria-label={isClosed ? 'Open Sidebar' : 'Close Sidebar'}
                >
                    {isClosed ? (<ArrowRight className="size-4" />) : (<ArrowLeft className="size-4" />)}
                </button>
            </div>
        </div>
    );
}
