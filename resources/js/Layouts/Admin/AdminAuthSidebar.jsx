import React, { useState, useRef } from 'react';
import CloseIcon from "@/Components/Icons/CloseIcon";
import ArrowUnder from "@/Components/Icons/ArrowUnder";
import { Link, useForm, usePage } from "@inertiajs/react";
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AdminAuthSidebar({ className }) {
    const { post } = useForm();
    const { url } = usePage();
    const [isProductNavOpen, setIsProductNavOpen] = useState(url.includes('/products'));
    const toggleProductNav = () => {
        setIsProductNavOpen(!isProductNavOpen);
    }
    const [isCompanyNavOpen, setIsCompanyNavOpen] = useState(url.includes('/companies'));
    const toggleCompanyNav = () => {
        setIsCompanyNavOpen(!isCompanyNavOpen);
    }

    const toggleMenu = () => {
        document.getElementById("sidebar").classList.toggle("hidden");
    };

    const handleLogoutSubmit = (e) => {
        e.preventDefault();
        post(route("admin.logout"));
    };


    return (
        <div
            id="sidebar"
            className={`bg-white md:w-[280px] hidden md:block w-full md:relative fixed z-10 shadow-right h-full md:h-auto ${
                className ? className : ""
            }`}
        >
            <div className="w-full h-[63px] bg-white px-4 py-[10px] flex relative border-b border-gray-100">
                <button
                    onClick={toggleMenu}
                    className="flex items-center space-x-4 md:hidden"
                >
                    <CloseIcon />
                </button>
                <Link href={route("admin.home")}>
                    <ApplicationLogo myClass="mt-1" />
                </Link>
            </div>
            <div className="w-full py-[16px]">
                {/* <Link
                    href={route("admin.dashboard")}
                    className={ (url.includes('/dashboard') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">ダッシュボード</span>
                </Link> */}
                <Link
                    href={route("admin.users")}
                    className={ (url.includes('/users') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">ユーザー管理</span>
                </Link>
                <Link
                    href={route("admin.payments")}
                    className={ (url.includes('/payments') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">会員登録売上</span>
                </Link>
                <Link
                    href={route("admin.withdrawals")}
                    className={ (url.includes('/withdrawals') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">会員支払管理</span>
                </Link>
                <Link
                    href={route("admin.withholdings")}
                    className={ (url.includes('/withholdings') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">源泉徴収税管理</span>
                </Link>
                <div className="">
                    <button
                        onClick={toggleCompanyNav}
                        href={route("admin.companies")}
                        className={ " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                    >
                        <span className="mr-2">企業管理</span>
                        <ArrowUnder className={"size-5 transform transition-all duration-200 " + (isCompanyNavOpen ? 'rotate-180' : '')}></ArrowUnder>
                    </button>
                    <ul
                        className={`text-[14px] rounded-lg transition-all duration-200
                            ${isCompanyNavOpen ? 'opacity-100 ' : ' overflow-hidden h-0'}`}
                    >
                        <li>
                            <Link 
                                href={route('admin.companies.requested')} 
                                className={(url.includes('/companies/requested') ? 'bg-gray-100 ' : '') + 'flex items-center justify-start w-full px-8 py-3 text-left hover:bg-gray-100 '}>
                                登録申請
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.companies.accepted')} 
                                className={(url.includes('/companies/accepted') ? 'bg-gray-100 ' : '') + 'flex items-center justify-start w-full px-8 py-3 text-left hover:bg-gray-100 '}>
                                企業一覧
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <button
                        onClick={toggleProductNav}
                        href={route("admin.products")}
                        className={ " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                    >
                        <span className="mr-2">商材管理</span>
                        <ArrowUnder className={"size-5 transform transition-all duration-200 " + (isProductNavOpen ? 'rotate-180' : '')}></ArrowUnder>
                    </button>
                    <ul
                        className={`text-[14px] rounded-lg transition-all duration-200
                            ${isProductNavOpen ? 'opacity-100 ' : ' overflow-hidden h-0'}`}
                    >
                        <li>
                            <Link 
                                href={route('admin.products.requested')} 
                                className={(url.includes('/products/requested') ? 'bg-gray-100 ' : '') + 'flex items-center justify-start w-full px-8 py-3 text-left hover:bg-gray-100 '}>
                                登録申請
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.products.accepted')} 
                                className={(url.includes('/products/accepted') ? 'bg-gray-100 ' : '') + 'flex items-center justify-start w-full px-8 py-3 text-left hover:bg-gray-100 '}>
                                商材一覧
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.products.blocked')} 
                                className={(url.includes('/products/blocked') ? 'bg-gray-100 ' : '') + 'flex items-center justify-start w-full px-8 py-3 text-left hover:bg-gray-100 '}>
                                ブロック商材
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link
                    href={route("admin.transactions")}
                    className={ (url.includes('/transactions') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">案件管理</span>
                </Link>
                <Link
                    href={route("admin.notices")}
                    className={ (url.includes('/notices') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">お知らせ管理</span>
                </Link>
                <Link
                    href={route("admin.contacts")}
                    className={ (url.includes('/contacts') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">問い合わせ管理</span>
                </Link>
                <Link
                    href={route("admin.opinions")}
                    className={ (url.includes('/opinions') ? 'bg-gray-100 ' : '') + " w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"}
                >
                    <span className="mr-2">意見箱管理</span>
                </Link>
            </div>
            <div className="w-full">
                <form onSubmit={handleLogoutSubmit}>
                    <button
                        type="submit"
                        className=" w-full px-4 py-3 flex items-center justify-between text-black hover:bg-gray-100"
                    >
                        <span className="mr-2">ログアウト</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
