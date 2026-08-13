import React, {useRef, useState, useEffect} from 'react';
import PhoneInput from "react-phone-input-2";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useForm, usePage } from '@inertiajs/react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";


export default function AreaChangeModal({
    user, 
    profile, 
    area_categories, 
    isOpen, 
    onClose }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        prefectures: '',
    });

    const submit = (e) => {
        e.preventDefault();
        const routeName = user ? 'admin.account.info.area.store' : 'account.info.area.store';
        const param = user ? [user.id] : [];
        post(route(routeName, param), {
            onFinish: () => {
                onClose();
            },
        });
    };

    const [selectedPrefectures, setSelectedPrefectures] = useState(profile.prefectures ? JSON.parse(profile.prefectures) : []);

    useEffect(() => {
        let temp = [];
        if (profile.prefectures) {
            JSON.parse(profile.prefectures).forEach(item => {
                temp.push(item);
            });
        }
        setSelectedPrefectures(temp);
    }, [profile]);

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
                    希望する商材の地域を変更
                </div>
                <div className="text-[12px] mb-10 leading-5">
                    <div>
                        <InputLabel className="mb-2" value="複数選択可能" />
                        <div className="rounded-md border border-gray-200 p-[4%] max-h-[280px] overflow-auto">
                            <div className="grid grid-cols-1 md:grid-cols-5 md:grid-flow-col md:grid-rows-12 gap-3 md:gap-2">
                                {area_categories.map((prefecture, index) => {
                                    if (prefecture == '全国') {
                                        return (
                                            <>
                                                <div className="" key={prefecture + "--"}>ーー<br /></div>
                                                <div className="" key={prefecture}>
                                                    <label className="flex items-center space-x-2 cursor-pointer text-[12px]">
                                                        <input
                                                            type="checkbox"
                                                            value={prefecture + index}
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
                                            <div className="" key={prefecture + index}>
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
