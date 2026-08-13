import CloseIcon from "@/Components/Icons/CloseIcon";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, useForm } from "@inertiajs/react";

export default function ComapanyAuthSidebar({ className }) {
    const { post } = useForm();

    const toggleMenu = () => {
        document.getElementById("sidebar").classList.toggle("hidden");
    };

    const handleLogoutSubmit = (e) => {
        e.preventDefault();
        post(route("company.logout"));
    };

    return (
        <div
            id="sidebar"
            className={`bg-white md:w-[280px] hidden md:block w-full md:relative fixed z-10 bg-white shadow-right h-full md:h-auto ${
                className ? className : ""
            }`}
        >
            <div className="w-full bg-white px-4 py-[20px] flex relative">
                <button
                    onClick={toggleMenu}
                    className="flex items-center space-x-4 md:hidden"
                >
                    <CloseIcon />
                </button>
                
                <Link href={route("admin.home")}>
                    <ApplicationLogo myClass="" />
                </Link>
            </div>
            <div className="w-full mt-4 py-[16px]">
                <Link
                    href={route("company.products.create")}
                    className="w-full bg-primary text-white px-4 py-2 flex items-center justify-between"
                >
                    <span className="mr-2">出品する</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
            <div className="w-full mt-8 py-[16px]">
                <Link
                    href={route("company.mypage.dashboard")}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">マイページ</span>
                </Link>
                <Link
                    href={route("company.products.index")}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">出品した商材</span>
                </Link>
                <Link
                    href={route("company.orders.index")}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">受注管理</span>
                </Link>
                <Link
                    href={route("company.users.index")}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">紹介者管理</span>
                </Link>
                <Link
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">問い合わせ管理</span>
                </Link>
                <Link
                    href={route("company.payments.index")}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">支払履歴</span>
                </Link>
                <Link
                    href={route("company.settings.account")}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">事業者情報</span>
                </Link>
            </div>
            <div className="w-full mt-8 py-[16px]">
                <Link
                    // href={route('company.help')}
                    href=""
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">ヘルプ</span>
                </Link>
                <Link
                    href=""
                    // href={route('company.terms')}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">利用規約</span>
                </Link>
                <Link
                    href=""
                    // href={route('company.center')}
                    className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                >
                    <span className="mr-2">ヘルプセンター</span>
                </Link>
            </div>
            <div className="w-full mt-4 py-[16px]">
                <form onSubmit={handleLogoutSubmit}>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100"
                    >
                        <span className="mr-2">ログアウト</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
