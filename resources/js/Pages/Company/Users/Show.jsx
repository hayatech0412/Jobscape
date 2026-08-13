import React, { useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CameraIcon from "@/Components/Icons/CameraIcon";
import ShieldWithCheck from "@/Components/Icons/ShieldWithCheck";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";

export default function Index({ user }) {
    return (
        <CompanyAuthLayout>
            {user && (
                <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">
                    <div className="w-[92%] mx-auto my-[4%]  pt-[50px] pb-[35px] bg-white border border-gray-200 rounded-lg shadow-md mt-[70px] md:mt-[120px] mb-10">
                        <div className="w-[92%] max-w-[1000px] mx-auto">
                            <div className="flex items-center justify-center">
                                <div className="relative border-[3px] border-white rounded-full -mt-32">
                                    <img
                                        className="w-24 h-24 rounded-full object-cover"
                                        src={user.avatar_url}
                                        alt="Profile"
                                    />
                                </div>
                            </div>
                            <div className="text-[20px] mb-2 font-bold text-center">
                                {user.profile.nickname}
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="flex items-center gap-1 text-[#3370ff] text-[13px] pb-4 px-12 border-b border-gray-300 mb-4">
                                    <ShieldWithCheck className={"w-6 h-6"} />
                                    <span className="text-gray-700">
                                        法人認証済
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[92%] mx-auto my-[4%] mb-[6%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="w-[92%] max-w-[1000px] mx-auto">
                            <div className="text-[20px] mb-4 font-bold">
                                アカウント情報
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        ニックネーム
                                    </div>
                                    <div className="text-[14px] grow max-w-[500px] text-right">
                                        {user.profile.nickname}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 py-3 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        アピール文
                                    </div>
                                    <div className="text-[14px] grow max-w-[500px]">
                                        {user.profile.appeal_statement}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 py-3 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        自己紹介文
                                    </div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        {user.profile.introduction}
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        個人メールアドレス（非公開）
                                    </div>
                                    <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                        <div className="text-[14px]">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        他のメールアドレス
                                    </div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        {user.profile.extra_email}
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        電話番号（非公開）
                                    </div>
                                    <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                        {user.profile.phone_number}
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        関心のあるカテゴリ
                                    </div>
                                    <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                        <div className="text-[14px]">
                                            {user.profile.categories?.map(
                                                (category, index) => (
                                                    <span
                                                        key={
                                                            category.id +
                                                            "-category" +
                                                            index
                                                        }
                                                    >
                                                        {category.name}
                                                        {user.profile.categories
                                                            .length -
                                                            1 !=
                                                        index
                                                            ? "/ "
                                                            : ""}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" py-4 border-b border-gay-200">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">
                                        希望する商材の地域
                                    </div>
                                    <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                        <div className="text-[14px]">
                                            {JSON.parse(
                                                user.profile.prefectures
                                            )?.map((area, index) => (
                                                <span
                                                    key={
                                                        area + "-area-" + index
                                                    }
                                                >
                                                    {area}
                                                    {JSON.parse(
                                                        user.profile.prefectures
                                                    )?.length -
                                                        1 !=
                                                    index
                                                        ? "/"
                                                        : ""}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CompanyAuthLayout>
    );
}
