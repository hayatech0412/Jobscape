import React, {useRef, useState, useEffect} from 'react';
import PhoneInput from "react-phone-input-2";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useForm, usePage } from '@inertiajs/react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";


export default function CategoryChangeModal({
    user, 
    categories, 
    category_ids, 
    isOpen, 
    onClose 
}) {    
    const toast = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        category_ids: '',
    });
    
    const submit = (e) => {
        e.preventDefault();
        if (selectedCategories.length > 3) {
            return;
        }

        const routeName = user ? 'admin.account.info.category.store' : 'account.info.category.store';
        const param = user ? [user.id] : [];
        post(route(routeName, param), {
            onFinish: () => {onClose()},
        });
    };

    const [selectedCategories, setSelectedCategories] = useState(category_ids ?? []);

    useEffect(() => {
        let temp = [];
        category_ids.forEach(item => {
            temp.push(item);
        });
        setSelectedCategories(temp);
    }, [category_ids]);

    useEffect(() => {
        setData({ category_ids: JSON.stringify(selectedCategories) });
    }, [selectedCategories]); 

    const handleCheckboxChange = (category) => {        
        setSelectedCategories((prev) =>
        prev.includes(category)
            ? prev.filter((item) => item !== category)
            : [...prev, category]
        );
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} 
        >
            <Toast ref={toast} />  
            <div 
                className="bg-white rounded-lg py-[5%] px-[7%] shadow-lg w-[86%] max-w-[900px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-semibold text-[24px] mb-6">
                    関心のあるカテゴリを変更
                </div>
                <div className="text-[12px] mb-10 leading-5">
                    <div>
                        <InputLabel className="mb-2" value="３つまで選択可能" />
                        <div className="grid grid-cols-2 gap-2 rounded-md border border-gray-200 p-[4%] max-h-[280px] overflow-auto">
                            {categories.map((category) => (
                                <div className="w-1/2 " key={category.id}>
                                    <label
                                        className="flex items-center space-x-2 cursor-pointer text-[12px] mb-2"
                                    >                                    
                                        <input
                                            type="checkbox"
                                            value={category.id}
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => handleCheckboxChange(category.id)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                        />
                                        <span className="text-gray-700">{category.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        {
                            selectedCategories.length > 3 ? <InputError  message="カテゴリーを3つ以下お選びください。" className="mt-2" /> : <></>
                        }                        
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
