import React, { useState } from 'react';

import EyeButton from '@/Components/EyeButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
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

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => {
                reset('password')
            },
        });
    };

    const reSend = (e) => {
        post(route('verification.send'), {
            onFinish: () => {
                reset('password')
            },
        });
    }

    return (
        <GuestLayout>
            <div className="w-[92%] max-w-[1024px] mx-auto bg-white mt-16 mb-40">
                <div className="w-[92%] max-w-[700px] mx-auto bg-white">
                    <form className="pt-20 pb-32" onSubmit={submit}>
                        <div className="w-[92%] mx-auto max-w-[700px]">
                            <div className=" text-[18px] mb-4">ログイン</div>
                            <div className="border border-gray-200 rounded-md px-[7%] py-[5%]">
                                <div>
                                    <InputLabel className="mb-2" htmlFor="email" value="メールアドレス" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                    <div className="mt-2 text-xs">※メールアドレスは後から変更できます</div>
                                </div>

                                <div className="mt-8">
                                    <InputLabel className="mb-2" htmlFor="password" value="パスワード" />
                                    
                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"                                     
                                            onChange={handleInputChange}
                                        />
                                        {/* <EyeButton
                                            handleClick={togglePasswordVisibility}
                                            visible={showPassword}
                                            className="absolute top-3 right-4 w-4 h-4"></EyeButton> */}
                                        <div
                                            onClick={togglePasswordVisibility}
                                            className="absolute top-4 text-[#3370ff] text-[10px] right-4 cursor-pointer">
                                                {showPassword ? '非表示' : '表示'}
                                        </div>
                                    </div>

                                    <InputError message={errors.password} className="mt-2" />
                                    <div className="mt-2 mb-4 text-xs">※8文字以上の半角英数字・特殊文字</div>
                                    <div>
                                        <p className={"mb-1 text-xs" + (isCompatable ? '' : ' text-gray-400')}><span className="text-base">✓</span> 8文字以上</p>
                                        <p className={"mb-1 text-xs" + (isCharactor ? '' : ' text-gray-400')}><span className="text-base">✓</span> 半角英数字・記号で構成される</p>
                                        <p className={"mb-1 text-xs" + (isStrong ? '' : ' text-gray-400')}><span className="text-base">✓</span> 安全性が高い</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[10px] mt-4 mb-4">
                                ログインまたはアカウントを作成することにより、JOBSCAPEの<Link className="text-[#3370ff]">利用規約、</Link><Link className="text-[#3370ff]">紹介規約、</Link>プライバシーポリシーをよみ、その内容に同意したものとみなされます。
                            </div>

                            <div className="text-center mt-8">
                                <PrimaryButton 
                                    className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80" 
                                    // disabled={
                                    //     !(
                                    //         !isEmpty &&
                                    //         isCompatable &&
                                    //         isCharactor &&
                                    //         isStrong
                                    //     )
                                    // }
                                >
                                    ログイン
                                </PrimaryButton>
                            </div>
                        </div>


                        <div className="text-center mt-6">
                            <Link href={route('register')} className="text-[12px] text-[#3370ff]">会員登録はこちら</Link>
                        </div>


                        {/* <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div> */}
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
