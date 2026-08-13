import CheckIcon from "@/Components/Icons/CheckIcon";
import InputError from "@/Components/InputError";
import CompanyGuestLayout from "@/Layouts/Company/CompanyGuestLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register({ status, canResetPassword }) {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const [isEmpty, setIsEmpty] = useState(true);
    const [isCompatable, setIsCompatable] = useState(false);
    const [isCharactor, setIsCharactor] = useState(false);
    const [isStrong, setIsStrong] = useState(false);
    const [isAgree, setIsAgree] = useState(false);

    const isStrongPassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            (password.length >= minLength &&
                hasUpperCase &&
                hasLowerCase &&
                hasNumbers &&
                hasSpecialChars) ||
            (password.length >= 16 &&
                (hasUpperCase || hasLowerCase) &&
                hasNumbers) ||
            (password.length >= 16 &&
                (hasUpperCase || hasLowerCase) &&
                hasSpecialChars) ||
            (password.length >= 32 &&
                (hasUpperCase || hasLowerCase || hasNumbers))
        );
    };

    const handleInputChange = (e) => {
        if (e.target.name === "password") {
            setIsCompatable(e.target.value.length >= 8);

            // a-z, A-Z, 0-9, !@#$%^&* の中の文字のみで構成されているか
            const regex = /^[a-zA-Z0-9!@#$%^&*,.?]+$/;
            setIsCharactor(regex.test(e.target.value));

            // 安全性が高いか
            setIsStrong(isStrongPassword(e.target.value));
        }

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });

        setIsEmpty(data.email === "" || data.password === "");
    };

    const handleCheckboxChange = (e) => {
        setIsAgree(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("company.register.store"));
    };

    return (
        <CompanyGuestLayout>
            <div className="bg-white lg:px-[60px] px-[20px] lg:py-[80px] py-[40px] shadow-md ">
                <div className="lg:flex lg:felx-row justify-between lg:gap-12 gap-0">
                    <div className="lg:w-[49%] w-full">
                        <h2 className="lg:text-[28px] text-[22px] font-bold">
                            <span className="text-primary">無料で</span>
                            JOBSCAPEをはじめよう！
                        </h2>
                        <p>
                            商材掲載は法人限定サービスです。登録には審査がございます。
                        </p>

                        <div className="my-[20px]">
                            <img
                                src="/assets/images/company_regist_step1.png"
                                alt="regist image"
                                className="mx-auto"
                            />
                        </div>

                        <p className="lg:block hidden text-[#333333]">
                            以下の法人確認書類と本人確認書類をご用意ください。
                        </p>

                        <ol className="lg:block hidden font-semibold my-6">
                            <li>・法人番号</li>
                            <li>・代表者様の名刺またはご担当者様の名</li>
                            <li>・要資格商材の場合は各種免許番号</li>
                            <li>・掲載希望商材 ※商材審査があります</li>
                            <li>
                                ・法人または商材のホームページ・パンフレット
                            </li>
                        </ol>

                        <p className="lg:block hidden w-[90%] line-break-anywhere">
                            まずは、こちらのフォームで法人審査申し込みを行い、続いて掲載希望商材の登録・審査へ進みます。それぞれの審査の結果
                            、JOBSCAPEへの入会・商材出品が承認されると、掲載がスタートします。
                        </p>

                        <div className="lg:block hidden text-[11px] mt-6">
                            ※出品商材ごとに審査があります。
                            <br />
                            ※いずれかの審査に不備が認められる場合、掲載をお断りする場合がございます。
                        </div>
                    </div>

                    <div className="flex-1 py-2">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    メールアドレス
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：jobscape@jobscape.co.jp"
                                    value={data.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError
                                    message={errors && errors.email}
                                    className="mt-1 text-[12px]"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <label
                                    htmlFor="password"
                                    className="text-[12px] block text-gray-700 font-bold mb-1 "
                                >
                                    パスワード
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="hs-toggle-password"
                                        className="appearance-none border border-gray-300 rounded w-full py-3 pl-6 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="••••••••••••••••"
                                        value={data.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 text-[10px] rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-600"
                                    >
                                        {showPassword ? '非表示' : '表示'}
                                    </div>
                                </div>

                                <InputError
                                    message={errors && errors.password}
                                    className="mt-1 text-[12px]"
                                />
                            </div>

                            <div className="">
                                <p
                                    className={`flex flex-row items-center mb-1 ${
                                        isCompatable ? "text-checkout" : ""
                                    }`}
                                >
                                    <CheckIcon
                                        className={`mr-2 ${
                                            isCompatable ? "text-checkout" : ""
                                        }`}
                                    />
                                    8文字以上
                                </p>
                                <p
                                    className={`flex flex-row items-center mb-1 ${
                                        isCharactor ? "text-checkout" : ""
                                    }`}
                                >
                                    <CheckIcon
                                        className={`mr-2 ${
                                            isCharactor ? "text-checkout" : ""
                                        }`}
                                    />
                                    半角英数字・記号で構成
                                </p>
                                <p
                                    className={`flex flex-row items-center mb-1 ${
                                        isStrong ? "text-checkout" : ""
                                    }`}
                                >
                                    <CheckIcon
                                        className={`mr-2 ${
                                            isStrong ? "text-checkout" : ""
                                        }`}
                                    />
                                    安全性が高い
                                </p>
                            </div>

                            <p className="mt-8">
                                アカウントを作成することにより、JOBSCAPEの
                                <span className="text-primary font-semibold">
                                    利用規約・プライバシーポリシー
                                </span>
                                に同意したものとみなされます。
                            </p>

                            <label className="mt-6 block flex flex-row items-center font-semibold">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                    onChange={handleCheckboxChange}
                                />
                                <span>
                                    利用規約・プライバシーポリシーに同意する
                                </span>
                            </label>

                            <div className="mt-6 text-center">
                                <button
                                    type="submit"
                                    className={
                                        "bg-primary hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 rounded-full lg:w-[80%] w-[100%]" +
                                        (!(
                                            !isEmpty &&
                                            isAgree &&
                                            isCompatable &&
                                            isCharactor &&
                                            isStrong
                                        )
                                            ? " disabled:opacity-50 disabled:cursor-not-allowed"
                                            : "")
                                    }
                                    disabled={
                                        !(
                                            !isEmpty &&
                                            isAgree &&
                                            isCompatable &&
                                            isCharactor &&
                                            isStrong
                                        )
                                    }
                                >
                                    アカウントを作成
                                </button>
                            </div>

                            <Link
                                href=""
                                className="block mt-6 w-full text-center text-primary hover:text-blue-400 font-semibold"
                            >
                                アカウントをお持ちの方はこちら
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </CompanyGuestLayout>
    );
}
