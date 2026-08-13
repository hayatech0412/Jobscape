import React, { useState, useEffect, useRef } from 'react';
import InputLabel from '@/Components/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function Category({
    Categories,
    CategoryIds
}) {
    const toast = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        category_ids: '',
    });
  
    const submit = (e) => {
        e.preventDefault();
        if (selectedCategories.length > 3) {            
            toast.current.show({ 
                severity: 'error', 
                summary: 'エラー', 
                detail: 'カテゴリーを3つお選びください。'
            });
            return;
        }

        post(route('register.category.store'), {
            onFinish: () => {},
        });
    };

    const [selectedCategories, setSelectedCategories] = useState(CategoryIds ?? []);

    useEffect(() => {
        let temp = [];
        CategoryIds.forEach(item => {
            temp.push(item);
        });
        setSelectedCategories(temp);
    }, [CategoryIds]);

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

    return (
        <GuestLayout>          
            <Toast ref={toast} />  
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.area')} className="w-6 h-6 my-6"></BackButton>
            </div> 
            <div className="w-[92%] max-w-[1024px] mx-auto mb-20 md:mb-20 bg-white">
                <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                    <div className="text-[20px] mb-8">お好みのカテゴリーを3つお選びください</div>
                    <p className="text-[12px]">ご答えいただくと、お客様に最適な案件情報をご案内できます。</p>
                    <p className="text-[12px] mb-12">選択したカテゴリーは後からいつでも変更可能です。</p>
                    
                    <div className="border border-gray-200 rounded-md px-[8%] py-[8%] mb-6 ">
                        <InputLabel className="mb-2" type="任意" value="３つまで選択可能" />
                        <div className="grid grid-cols-1 md:grid-cols-2 rounded-md border border-gray-200 p-[4%] max-h-[280px] overflow-auto">
                            {Categories.map((category) => (
                                <div key={category.id}>
                                    <label
                                        className="flex items-center space-x-2 cursor-pointer text-[12px] mb-4"
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
                    </div>  

                    <div className="text-center mt-10">
                        <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                            次へ
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
