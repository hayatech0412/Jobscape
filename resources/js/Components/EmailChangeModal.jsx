import React from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useForm, usePage } from '@inertiajs/react';

export default function EmailChangeModal({ 
    isOpen, 
    onClose,
    user,
}) {
    
    const {auth, errors} = usePage().props;
    
    const { data, setData, post, processing, reset } = useForm({
        email: user?.email ?? auth.user.email ?? '',
    });
    
    if (!isOpen) return (<></>);
    
    const submit = () =>  {
        const routeName = user ? 'admin.account.info.email.store' : 'account.info.email.store';
        const param = user ? [user.id] : [];
        post(route(routeName, param), {
            onFinish: () => {
                onClose();
            },
        });
    }

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
                    メールアドレスを変更
                </div>
                <div className="text-[12px] mb-10 leading-5">
                    <div>
                        <InputLabel className="mb-2" htmlFor="email" value="メールアドレス" />

                        <TextInput
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => {setData({email: e.target.value})}}
                        />
                        <InputError message={errors.email} className="mt-2" />
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
