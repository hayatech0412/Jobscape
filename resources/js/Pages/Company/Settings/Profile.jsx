import CardNumberInput from "@/Components/CardNumberInput";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import BackArrow from "@/Components/Icons/BackArrow";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import { Link } from "@inertiajs/react";

export default function Profile() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <CompanyAuthLayout>
            <div className="px-4 py-3 relative flex items-center justify-center bg-white">
                <h2 className="font-semibold text-[18px]">
                    プロフィールル変更
                </h2>
                <Link
                    href="/company/settings/account"
                    className="absolute -translate-y-1/2 top-1/2 left-4"
                >
                    <BackArrow />
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 py-4 md:max-w-[700px] w-full mt-8 mx-auto">
                    <div className="flex md:flex-row flex-col md:items-center items-start justify-start md:px-4 py-4 md:w-5/6 w-full">
                        <p className="w-[200px] text-sky-950 font-semibold">ユーザー名</p>
                        <input
                            type="text"
                            name="nickname"
                            className="appearance-none flex-1 border border-gray-300 rounded w-full md:mt-0 mt-2 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[12px]"
                        />
                    </div>

                    <div className="border border-l-0 border-r-0 border-b-0"></div>

                    <div className="flex md:flex-row flex-col md:items-center items-start justify-start md:px-4 py-4 md:w-5/6 w-full">
                        <p className="w-[200px] text-sky-950 font-semibold">プロフィール画像</p>
                        <div className="flex md:mt-0 mt-2 items-center justify-start">
                            <img
                                src="/storage/avatars/user_avatar.png"
                                alt="プロフィール画像"
                                className="w-[40px] h-auto"
                            />
                            <button type="button" className="text-primary ml-2">
                                画像を変更する
                            </button>
                        </div>
                    </div>
                </div>

                <button type="submit" className="block mt-8 mx-auto bg-sky-950 text-white font-semibold rounded-md px-16 py-2">変更する</button>
            </form>
        </CompanyAuthLayout>
    );
}
