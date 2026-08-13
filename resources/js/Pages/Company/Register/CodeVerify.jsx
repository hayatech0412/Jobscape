import LinkIcon from "@/Components/Icons/LinkIcon";
import InputError from "@/Components/InputError";
import CompanyGuestLayout from "@/Layouts/Company/CompanyGuestLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function CodeVerify({ status, canResetPassword }) {
    const { data, setData, post, errors } = useForm({
        verify_code: "",
    });

    const [verifyCode, setVerifyCode] = useState("");
    const [canSend, setCanSend] = useState(false);

    const handleInputChange = (e) => {
        const input = e.target.value.replace(/\D/g, "");
        setVerifyCode(input);
        setData({
            ...data,
            [e.target.name]: input,
        });
        setCanSend(input !== "" && input.length === 6);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("company.register.code_verify"));
    };

    const handleRegenerateSubmit = (e) => {
        e.preventDefault();
        setData({
            ...data,
            verify_code: verifyCode,
        });

        post(route("company.register.regenerate_code"));
    };

    return (
        <CompanyGuestLayout>
            <div className="bg-white lg:px-[60px] px-[20px] lg:py-[80px] py-[40px] shadow-md lg:w-[80%] mx-auto w-full">
                <div className="lg:w-[80%] w-full mx-auto">
                    <h2 className="lg:text-[24px] text-[22px] w-full text-left font-bold">
                        認証コードを入力
                    </h2>

                    <p className="mt-2">
                        <span className="font-semibold text-[16px]">
                            jobscape@jobscape.com{" "}
                        </span>
                        へ認コードをお送りしました。
                        <br />
                        下記へ入力し、次へお進みください。
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-8 mb-16">
                            <label
                                htmlFor="verify_code"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                認証コード
                            </label>
                            <input
                                name="verify_code"
                                className="appearance-none border border-gray-300 rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：123456"
                                min={100000}
                                max={999999}
                                value={verifyCode}
                                onChange={handleInputChange}
                                onKeyUp={handleInputChange}
                                required
                            />
                            <InputError
                                message="認証コードは発行から10分後に無効になります"
                                className="mt-1 text-[12px]"
                            />
                            {errors.verify_code && (
                                <InputError
                                    message={errors.verify_code}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                className={`bg-primary hover:bg-primary-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 rounded-full lg:w-[60%] w-[100%] mb-4 ${
                                    !canSend
                                        ? " disabled:opacity-50 disabled:cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={!canSend}
                            >
                                認証しアカウントを作成
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <form onSubmit={handleRegenerateSubmit}>
                            <button
                                type="submit"
                                className="bg-white border border-primary focus:shadow-outline focus:outline-none text-primary hover:text-blue-400 hover:border-blue-400 font-bold py-4 px-4 rounded-full lg:w-[60%] w-[100%] mb-4"
                            >
                                認証コードを再送する
                            </button>
                        </form>
                    </div>

                    <div className="text-[11px] mt-6">
                        ※キャリアメールでは受備できない場合がございます。受価可能なアドレスをご利用ください。
                        <br />
                        ※受備設託・※感メールをご確認ください。
                    </div>

                    <div className="mt-16 border border-r-0 border-l-0 border-b-0">
                        <Link
                            href=""
                            className="block font-semibold hover:text-gray-500 flex flex-row items-center justify-between lg:text-[14px] text-[12px] lg:pr-2 py-4 border border-r-0 border-l-0 border-t-0"
                        >
                            認証コードが受け取れない場合はこちら
                            <LinkIcon
                                width="4"
                                height="4"
                                className="text-primary"
                            />
                        </Link>

                        <Link
                            href=""
                            className="block font-semibold hover:text-gray-500 flex flex-row items-center justify-between lg:text-[14px] text-[12px] lg:pr-2 py-4 border border-r-0 border-l-0 border-t-0"
                        >
                            ヘルプ
                            <LinkIcon
                                width="4"
                                height="4"
                                className="text-primary"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </CompanyGuestLayout>
    );
}
