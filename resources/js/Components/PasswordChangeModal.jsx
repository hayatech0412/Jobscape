import React, {useState} from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import EyeButton from '@/Components/EyeButton';
import { useForm, usePage } from '@inertiajs/react';

export default function PasswordChangeModal({ 
    isOpen, 
    onClose,
    user,
}) {
    const {auth, errors} = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        password: '',
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

        setIsEmpty(data.password === "");
    };

    const submit = (e) => {
        e.preventDefault();
        const routeName = user ? 'admin.account.info.password.store' : 'account.info.password.store';
        const param = user ? [user.id] : [];
        if (isStrong) {
            post(route(routeName, param), {
                onFinish: () => onClose(),
            });
        }
    };

    if (!isOpen) return (<></>);
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} 
        >
            <div 
                className="bg-white rounded-lg py-[5%] px-[7%] shadow-lg w-[86%] max-w-[900px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-semibold text-[24px] mb-6">
                    パスワードを変更
                </div>
                <div className="text-[12px] mb-10 leading-5">
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
                        <EyeButton
                            handleClick={togglePasswordVisibility}
                            visible={showPassword}
                            className="absolute top-3 right-4 w-4 h-4"></EyeButton>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                    <div className="mt-2 mb-4 text-xs">※8文字以上の半角英数字・特殊文字</div>
                    <div>
                        <p className={"mb-1 text-xs" + (isCompatable ? '' : ' text-gray-400')}><span className="text-base">✓</span> 8文字以上</p>
                        <p className={"mb-1 text-xs" + (isCharactor ? '' : ' text-gray-400')}><span className="text-base">✓</span> 半角英数字・記号で構成される</p>
                        <p className={"mb-1 text-xs" + (isStrong ? '' : ' text-gray-400')}><span className="text-base">✓</span> 安全性が高い</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full max-w-[400px] mx-auto">
                    <button onClick={submit} className="bg-[#3370ff] h-12 rounded-full w-full flex justify-center items-center text-white text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                        保存する
                    </button>
                    <button onClick={onClose} className="border border-gray-200 h-12 rounded-full w-full flex justify-center items-center text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
}
