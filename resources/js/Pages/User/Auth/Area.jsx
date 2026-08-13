import React, { useState, useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Area({
    AreaCategories,
    Profile
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        prefectures: '',
    });  
    
    const submit = (e) => {
        e.preventDefault();
        
        post(route('register.area.store'), {
            onFinish: () => {       
            },
        });
    };

    const [selectedPrefectures, setSelectedPrefectures] = useState(Profile.prefectures ? JSON.parse(Profile.prefectures) : []);

    useEffect(() => {
        let temp = [];
        if (Profile.prefectures) {
            JSON.parse(Profile.prefectures).forEach(item => {
                temp.push(item);
            });
        }
        setSelectedPrefectures(temp);
    }, [Profile]);

    useEffect(() => {
        setData({ prefectures: JSON.stringify(selectedPrefectures) });
    }, [selectedPrefectures]); 

    const handleCheckboxChange = (prefecture) => {
        setSelectedPrefectures((prev) =>
        prev.includes(prefecture)
            ? prev.filter((item) => item !== prefecture)
            : [...prev, prefecture]
        );
    };

    return (
        <GuestLayout>                              
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.maininfo')} className="w-6 h-6 my-6"></BackButton>
            </div> 
            <div className="w-[92%] max-w-[1024px] mx-auto mb-20 md:mb-20 bg-white">
                <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                    <div className="text-[20px] mb-8">主にどの地域の商材をお探しですか？</div>
                    <p className="text-[12px]">ご答えいただくと、お客様に最適な地域情報をご案内できます。</p>
                    <p className="text-[12px] mb-12">選択した地域は後からいつでも変更可能です。</p>
                    
                    <div className="border border-gray-200 rounded-md px-[8%] py-[8%] mb-6 ">
                        <InputLabel className="mb-2" type="任意" value="複数選択可能" />
                        <div className="rounded-md border border-gray-200 p-[4%] max-h-[350px] md:max-h-[240px] overflow-auto">
                            <div className="grid grid-cols-1 md:grid-cols-5 md:grid-flow-col md:grid-rows-12 gap-3 md:gap-2">
                                {AreaCategories.map((prefecture) => {
                                    if (prefecture == '全国') {
                                        return (    
                                            <>
                                                <div className="" key={prefecture + "--"}>ーー<br /></div>
                                                <div className="" key={prefecture}>                                        
                                                    <label className="flex items-center space-x-2 cursor-pointer text-[12px]">                                    
                                                        <input
                                                            type="checkbox"
                                                            value={prefecture}
                                                            checked={selectedPrefectures.includes(prefecture)}
                                                            onChange={() => handleCheckboxChange(prefecture)}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                                        />
                                                        <span className="text-gray-700">{prefecture}</span>
                                                    </label>
                                                </div>
                                            </>
                                        );
                                    } else {
                                        return (
                                            <div className="" key={prefecture}>                                        
                                                <label className="flex items-center space-x-2 cursor-pointer text-[12px]">                                    
                                                    <input
                                                        type="checkbox"
                                                        value={prefecture}
                                                        checked={selectedPrefectures.includes(prefecture)}
                                                        onChange={() => handleCheckboxChange(prefecture)}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                                    />
                                                    <span className="text-gray-700">{prefecture}</span>
                                                </label>
                                            </div>
                                        );
                                    }                                    
                                })}
                            </div>
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
