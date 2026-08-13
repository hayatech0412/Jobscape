import { useState } from "react";
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import BackButton from '@/Components/BackButton';
import CustomCheckbox from '@/Components/CustomCheckbox';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        vite_code: '',
        is_agree: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

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

    };

    const handleSetData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>           
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('login')} className="w-6 h-6 my-6"></BackButton>
            </div>

            <div className="w-[92%] max-w-[1024px] mx-auto bg-white mb-40 ">
                <div className="w-[92%] max-w-[500px] mx-auto">
                    <form className="pt-20 pb-20" onSubmit={submit}>
                        <div className="text-[24px] mb-4 font-semibold"><span className="text-[#3370ff]">さあ、</span>JOBSCAPEをはじめよう！</div>
                        <div className="mb-12">まずはアカウントを作成しましょう</div>

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
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.email} className="mt-2" />
                            <div className="mt-2 text-xs">※メールアドレスは後から変更できます</div>
                        </div>

                        <div className="mt-6">
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
                                <div
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-4 text-[#3370ff] text-[10px] right-4 cursor-pointer">
                                        {showPassword ? '非表示' : '表示'}
                                </div>
                            </div>

                            <InputError message={errors.password} className="mt-2" />
                            <div className="mt-2 mb-4 text-xs">※8文字以上の半角英数字・特殊文字</div>
                            <div>
                                <p className="mb-1 text-xs ">
                                    <span className="text-base">✓ </span> 
                                    <span className={"mb-1 text-xs " + (isCompatable ? 'text-[#359737]' : ' text-[gray-400]')}>8文字以上</span>
                                </p>
                                <p className="mb-1 text-xs ">
                                    <span className="text-base">✓ </span> 
                                    <span className={"mb-1 text-xs " + (isCharactor ? 'text-[#359737]' : ' text-[gray-400]')}>半角英数字・記号で構成される</span>
                                </p>
                                <p className="mb-1 text-xs ">
                                    <span className="text-base">✓ </span> 
                                    <span className={"mb-1 text-xs " + (isStrong ? 'text-[#359737]' : ' text-[gray-400]')}>安全性が高い</span>
                                </p>
                            </div>
                        </div>

                        <div className="my-6 w-full">
                            <InputLabel className="mb-2" type={'任意'} value="招待コード" />

                            <TextInput
                                id="vite_code"
                                type="text"
                                name="vite_code"
                                value={data.vite_code}
                                className="mt-1 block w-full"
                                placeholder="入力してください"
                                onChange={(e) => setData({...data, vite_code: e.target.value})}
                            />
                            <InputError message={errors.vite_code} className="mt-2" />
                        </div>

                        <div className="text-[12px] mt-4 mb-4">
                            アカウントを作成することにより、JOBSCAPEの
                            <Link className="text-[#3370ff]">利用規約、</Link>
                            <Link className="text-[#3370ff]">プライバシーポリシー</Link>
                            に同意したものとみなされます。
                        </div>

                        <div className="flex justify-center my-6">
                            <CustomCheckbox
                                checked={data.is_agree}
                                label="利用規約・プライバシーポリシーに同意する"
                                onChange={() => handleSetData('is_agree', !data.is_agree)}
                            />
                        </div>

                        <div className="text-center mt-8">
                            <PrimaryButton 
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80" 
                                disabled={
                                    !(
                                        data.is_agree &&
                                        isCompatable &&
                                        isCharactor &&
                                        isStrong
                                    )
                                }
                            >
                                次へ
                            </PrimaryButton>
                        </div>
                        
                        <div className="text-center mt-6">
                            <Link href={route('login')} className="text-[12px] text-[#3370ff]">アカウントをお持ちの方はこちら</Link>
                        </div>
                    </form>
                </div>
            </div>
            
        </GuestLayout>
    );
}
