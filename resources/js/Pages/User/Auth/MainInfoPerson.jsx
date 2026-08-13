import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import CustomRadioButtons from "@/Components/CustomRadioButtons";
import CustomCheckbox from "@/Components/CustomCheckbox";
import ArrowRightTop from "@/Components/Icons/ArrowRightTop";
import { Head, Link, useForm } from '@inertiajs/react';

export default function MainInfoPerson({
    Genders,
    Profile,
    prefs,
    user_type
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_type : user_type,
        last_name : Profile.last_name ?? '',
        first_name : Profile.first_name ?? '',
        last_kana : Profile.last_kana ?? '',
        first_kana : Profile.first_kana ?? '',
        birthday : Profile.birthday ?? '',
        birth_year : Profile.birthday ? new Date(Profile.birthday).getFullYear() : '',  // 年
        birth_month : Profile.birthday ? new Date(Profile.birthday).getMonth() + 1 : '',  // 月（0から始まるので+1）
        birth_day : Profile.birthday ? new Date(Profile.birthday).getDate() : '',        // 日
        post_number : Profile.post_number ?? '',
        pref : Profile.pref ?? '',
        city : Profile.city ?? '',
        area : Profile.area ?? '',
        street : Profile.street ?? '',
        building : Profile.building ?? '',
        gender : Profile.gender ?? 1,
        is_notify : Profile.is_notify ?? false,
    });

    // 生年月日が更新されたときの処理
    useEffect(() => {
        if (data.birth_year && data.birth_month && data.birth_day) {
            const formattedBirthday = `${data.birth_year}-${String(data.birth_month).padStart(2, '0')}-${String(data.birth_day).padStart(2, '0')}`;
            setData({ ...data, birthday: formattedBirthday });
        }
    }, [data.birth_year, data.birth_month, data.birth_day]);

    const currentYear = new Date().getFullYear();
    const year_options = Array.from({ length: 100 }, (_, i) => ({
        value: currentYear - i,
        label: currentYear - i,
    }));

    const month_options = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: String(i + 1).padStart(2, '0'),
    }));

    // 日付は、月ごとに最大の日数を考慮して作成
    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const day_options = () => {
        const daysInMonth = getDaysInMonth(data.birth_month, data.birth_year);
        return Array.from({ length: daysInMonth }, (_, i) => ({
            value: i + 1,
            label: String(i + 1).padStart(2, '0'),
        }));
    };

    const handleYearSelect = (value) => {
        setData({...data, birth_year: value});
    };

    const handleMonthSelect = (value) => {
        setData({...data, birth_month: value});
    };

    const handleDateSelect = (value) => {
        setData({...data, birth_day: value});
    };

    const setGender = (value) => {
        setData({...data, gender: value});
    };

    const handleSetData = (key, value) => {
        setData({...data, [key]: value});
    }
  
    const submit = (e) => {
        e.preventDefault();

        post(route('register.maininfo.store'), {
            onFinish: () => {},
        });
    };

    return (
        <div>
            <div className="border border-gray-200 rounded-md px-[8%] py-[4%] ">
                <div className="my-8">
                    本人確認書類の情報通りご入力ください         
                </div>

                <div className="">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                        <div className="font-semibold text-[15px]">氏名</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="">
                            <div className="text-[12px]" >姓</div>
                            <TextInput
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                className="mt-1 block w-full"
                                placeholder="例：山田"
                                onChange={(e) => handleSetData('last_name', e.target.value)}
                            />
                        </div>

                        <div className="">
                            <div className="text-[12px]" >名</div>
                            <TextInput
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full"
                                placeholder="例：太郎"
                                onChange={(e) => handleSetData('first_name', e.target.value)}
                            />          
                        </div>

                        <div className="">
                            <div className="text-[12px]" >姓カナ</div>
                            <TextInput
                                id="last_kana"
                                type="text"
                                name="last_kana"
                                value={data.last_kana}
                                className="mt-1 block w-full"
                                placeholder="例：ヤマダ"
                                onChange={(e) => handleSetData('last_kana', e.target.value)}
                            />     
                        </div>

                        <div className="">
                            <div className="text-[12px]" >名カナ</div>
                            <TextInput
                                id="first_kana"
                                type="text"
                                name="first_kana"
                                value={data.first_kana}
                                className="mt-1 block w-full"
                                placeholder="例：タロウ"
                                onChange={(e) => handleSetData('first_kana', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <InputError message={ errors.last_name ?? errors.first_kana ?? errors.last_name ?? errors.first_kana } className="mt-2" />

                <div className="text-[12px] mt-2">※全角でご入力ください</div>

                <div className="mt-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                        <div className="font-semibold text-[15px]">生年月日</div>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <CustomSelect first=" " currentOption={data.birth_year} className="w-full" options={year_options} onSelect={handleYearSelect} />
                        <CustomSelect first=" " currentOption={data.birth_month} className="w-full" options={month_options} onSelect={handleMonthSelect} />
                        <CustomSelect first=" " currentOption={data.birth_day} className="w-full" options={day_options()} onSelect={handleDateSelect} />
                    </div>
                    <InputError message={errors.birthday} className="mt-2" />                                           
                </div>

                <div className="sm:flex items-center justify-between mt-2 pb-8 my-6 border-b border-gray-200">
                    <div className="font-normal text-[12px]">※<span className="text-[#3370ff]">18歳未満</span>の方はご利用いただけません。</div>
                    <Link className="flex leading-none text-[12px] text-[#3370ff] mt-8">
                        ご利用年齢制限について<ArrowRightTop className="w-3 h-3"></ArrowRightTop>
                    </Link>
                </div>

                <div className="mt-12 pb-12 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                        <div className="font-semibold text-[15px]">住所</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="">
                            <div className="text-[12px]" >郵便番号</div>
                            <TextInput
                                type="number"
                                name="post_number"
                                value={data.post_number}
                                className="mt-1 block w-full pr-8"
                                placeholder="例：1040045"
                                onChange={(e) => handleSetData('post_number', e.target.value)}
                            />
                        </div>
                        <div className="">
                            <div className="text-[12px] mb-1" >都道府県</div>
                            <CustomSelect 
                                id="personal"
                                first=" " 
                                className="w-full" 
                                currentOption={data.pref} 
                                options={prefs} 
                                onSelect={ (value) => { handleSetData('pref', value) } } 
                            />
                        </div>
                    </div>
                    <InputError message={errors.post_number ?? errors.pref} className="mt-2" />

                    <div className="mt-3">
                        <div className="text-[12px]" >市区町村</div>
                        <TextInput
                            type="text"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full pr-8"
                            placeholder="例：中央区"
                            onChange={(e) => handleSetData('city', e.target.value)}
                        />
                        <InputError message={errors.city} className="mt-2" />
                    </div>

                    <div className="mt-3">
                        <div className="text-[12px]" >町域</div>                    
                        <TextInput
                            type="text"
                            name="area"
                            value={data.area}
                            className="mt-1 block w-full pr-8"
                            placeholder="例：築地"
                            onChange={(e) => handleSetData('area', e.target.value)}
                        />
                        <InputError message={errors.area} className="mt-2" />
                    </div>

                    <div className="mt-3">
                        <div className="text-[12px]" >丁目・番地・号</div>
                        <TextInput
                            type="text"
                            name="street"
                            value={data.street}
                            className="mt-1 block w-full pr-8"
                                placeholder="例：3-4-13"
                            onChange={(e) => handleSetData('street', e.target.value)}
                        />
                        <InputError message={errors.street} className="mt-2" />
                    </div>

                    <div className="mt-3">
                        <div className="text-[12px]" >建物名・階数・部屋番号</div>
                        <TextInput
                            type="text"
                            name="building"
                            value={data.building}
                            className="mt-1 block w-full pr-8"
                                placeholder="例：電気工事会館　5階"
                            onChange={(e) => handleSetData('building', e.target.value)}
                        />
                        <InputError message={errors.building} className="mt-2" />
                    </div>                                      
                </div>

                <div className=" mt-12 mb-6 pb-12 border-b border-gray-200">
                    <InputLabel className="mb-2" htmlFor="gender" value="性別" type="任意" />
                    <div className="">
                        <CustomRadioButtons id="gender" currentOption={data.gender} options={Genders} onChange={setGender} />
                    </div>
                    <InputError message={errors.gender} className="mt-2" />      
                    <div className="font-normal text-[12px] mt-6">※サービス向上のため使用します。公開されることはありません。</div>                                 
                </div>

                <div className="mt-12 mb-6">
                    <CustomCheckbox
                        checked={data.is_notify}
                        type="任意"
                        label="JOBSCAPEからのお知らせを受け取る"
                        onChange={() => handleSetData('is_notify', !data.is_notify)}
                    />
                </div>

                <div className="text-[12px] mb-2">お得な情報などをメールで配信します</div>
                <div className="text-[12px] pb-4">※別途の通信料がかかる場合があります</div>
            </div> 

            <div className="text-center mt-12">
                <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                    次へ
                </PrimaryButton>
            </div>
        </div>
    );
}
