import React from 'react';
import PhoneInput from "react-phone-input-2";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useForm, usePage } from '@inertiajs/react';
import "react-phone-input-2/lib/style.css"; // 必須: スタイルの読み込み


export default function PhoneNumberChangeModal({ 
    isOpen, 
    onClose,
    user,
}) {

    const {auth, errors} = usePage().props;

    const { data, setData, post, processing, reset } = useForm({
        phone_number: user ? user.profile?.phone_number : (auth.user.profile?.phone_number ?? ''),
    });

    const submit = () =>  {
        const routeName = user ? 'admin.account.info.phonenumber.store' : 'account.info.phonenumber.store';
        const param = user ? [user.id] : [];
        post(route(routeName, param), {
            onFinish: () => {
                onClose();
            },
        });
    }
    
    if (!isOpen) return null;

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
                    電話番号を変更
                </div>
                <div className="text-[12px] mb-10 leading-5">
                    <div>
                    <InputLabel className="mb-2" htmlFor="phone_number" value="電話番号" />

                    <PhoneInput
                        id="phone_number"
                        country="jp" // デフォルトの国コードを日本に設定
                        value={data.phone_number} // 入力値のバインディング
                        onChange={(value) => setData({phone_number: value})} // 値の変更時に更新
                        inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                        }}
                        containerStyle={{ marginBottom: "20px" }} // コンテナのスタイル
                        inputStyle={{ width: "100%", height: "40px" }} // 入力フィールドのスタイル
                        buttonStyle={{ backgroundColor: "white" }} // フラグボタンのスタイル
                    />
                    <InputError message={errors.phone_number} className="mt-2" />
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
