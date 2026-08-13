import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import ArrowRight from '@/Components/Icons/ArrowRight';
import CustomRadioButtons from "@/Components/CustomRadioButtons";
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';

export default function BusinessInfo({
    profile,
    prefs,
    Genders,
}) {
    const {auth} = usePage().props;
    const personalInfoForm = useForm({
        last_name: profile.last_name ?? '',
        first_name: profile.first_name ?? '',
        last_kana: profile.last_kana ?? '',
        first_kana: profile.first_kana ?? '',
        birthday: profile.birthday ?? '',
        birth_year : profile.birthday ? new Date(profile.birthday).getFullYear() : '',  // 年
        birth_month : profile.birthday ? new Date(profile.birthday).getMonth() + 1 : '',  // 月（0から始まるので+1）
        birth_day : profile.birthday ? new Date(profile.birthday).getDate() : '',        // 日
        gender : profile.gender ?? 1,
        post_number : profile.post_number ?? '',
        country: profile.country ?? '',
        pref: profile.pref ?? '',
        city: profile.city ?? '',
        area: profile.area ?? '',
        street: profile.street ?? '',
        building: profile.building ?? '',
    });

    // 生年月日が更新されたときの処理
    useEffect(() => {
        if (personalInfoForm.data.birth_year && personalInfoForm.data.birth_month && personalInfoForm.data.birth_day) {
            const formattedBirthday = `${personalInfoForm.data.birth_year}-${String(personalInfoForm.data.birth_month).padStart(2, '0')}-${String(personalInfoForm.data.birth_day).padStart(2, '0')}`;
            personalInfoForm.setData({ ...personalInfoForm.data, birthday: formattedBirthday });
        }
    }, [personalInfoForm.data.birth_year, personalInfoForm.data.birth_month, personalInfoForm.data.birth_day]);

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
        const daysInMonth = getDaysInMonth(personalInfoForm.data.birth_month, personalInfoForm.data.birth_year);
        return Array.from({ length: daysInMonth }, (_, i) => ({
            value: i + 1,
            label: String(i + 1).padStart(2, '0'),
        }));
    };

    const handleYearSelect = (value) => {
        personalInfoForm.setData({...personalInfoForm.data, birth_year: value});
    };

    const handleMonthSelect = (value) => {
        personalInfoForm.setData({...personalInfoForm.data, birth_month: value});
    };

    const handleDateSelect = (value) => {
        personalInfoForm.setData({...personalInfoForm.data, birth_day: value});
    };

    const setGender = (value) => {
        personalInfoForm.setData({...personalInfoForm.data, gender: value});
    };

    const businessInfoForm = useForm({
        user_type: profile.user_type ?? '',
        business_name: profile.business_name ?? '',
        business_kana: profile.business_name ?? '',
        business_post_number: profile.business_post_number ?? '',
        business_pref: profile.business_pref ?? '',
        business_city: profile.business_city ?? '',
        business_area: profile.business_area ?? '',
        business_street: profile.business_street ?? '',
        business_building: profile.business_building ?? '',
        business_phone_number: profile.business_phone_number ?? '',
        business_invoice_number: profile.business_invoice_number ?? '',
    });

    const handlePersonalInfoSetData = (key, value) => {
        personalInfoForm.setData({...personalInfoForm.data, [key]: value});
    }

    const handleBusinessInfoSetData = (key, value) => {
        businessInfoForm.setData({...businessInfoForm.data, [key]: value});
    }

    function formatDate(dateString) {
        return dayjs(dateString).format("YYYY/MM/DD");
    }

    const business_types = [
        {label: '法人', value: '2', key: 'CORPORATION'},
        {label: '個人事業主', value: '3', key: 'PROPRIETOR'},
    ]

    const personalInfoSubmit = () => {
        personalInfoForm.post(route('account.business.personal.store'), {
            onFinish: () => {

            },
        });
    }

    const businessInfoSubmit = () => {
        businessInfoForm.post(route('account.business.store'), {
            onFinish: () => {

            },
        });
    }

    return (
        <UserAuthMainLayout>
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">

                <div className="w-[92%] mx-auto my-[4%] mb-[6%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-4 font-bold">本人情報</div>

                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                <div className="text-[14px]">姓</div>
                                <div className="relative text-[14px] grow max-w-[400px]">
                                    <TextInput
                                        type="text"
                                        name="last_name"
                                        value={personalInfoForm.data.last_name}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handlePersonalInfoSetData('last_name', e.target.value)}
                                    />
                                    <InputError message={personalInfoForm.errors.last_name} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                <div className="text-[14px]">名</div>
                                <div className="relative text-[14px] grow max-w-[400px]">
                                    <TextInput
                                        type="text"
                                        name="first_name"
                                        value={personalInfoForm.data.first_name}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handlePersonalInfoSetData('first_name', e.target.value)}
                                    />
                                    <InputError message={personalInfoForm.errors.first_name} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                <div className="text-[14px]">姓カナ</div>
                                <div className="relative text-[14px] grow max-w-[400px]">
                                    <TextInput
                                        type="text"
                                        name="last_kana"
                                        value={personalInfoForm.data.last_kana}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handlePersonalInfoSetData('last_kana', e.target.value)}
                                    />
                                    <InputError message={personalInfoForm.errors.last_kana} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                <div className="text-[14px]">名カナ</div>
                                <div className="relative text-[14px] grow max-w-[400px]">
                                    <TextInput
                                        type="text"
                                        name="first_kana"
                                        value={personalInfoForm.data.first_kana}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handlePersonalInfoSetData('first_kana', e.target.value)}
                                    />
                                    <InputError message={personalInfoForm.errors.first_kana} className="mt-2" />
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                <div className="text-[14px]">生年月日</div>
                                <div className="relative text-[14px] grow max-w-[400px]">
                                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                                        <CustomSelect first=" " currentOption={personalInfoForm.data.birth_year} className="w-full" options={year_options} onSelect={handleYearSelect} />
                                        <CustomSelect first=" " currentOption={personalInfoForm.data.birth_month} className="w-full" options={month_options} onSelect={handleMonthSelect} />
                                        <CustomSelect first=" " currentOption={personalInfoForm.data.birth_day} className="w-full" options={day_options()} onSelect={handleDateSelect} />
                                    </div>
                                    <InputError message={personalInfoForm.errors.birthday} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 w-full border-b border-gay-200 py-4">
                                <div className="text-[14px]">性別</div>
                                <div className="relative text-[14px] grow max-w-[400px] min-h-[42px] flex items-center">
                                    <CustomRadioButtons id="gender" currentOption={personalInfoForm.data.gender} options={Genders} onChange={setGender} className="flex-row"/>
                                    <InputError message={personalInfoForm.errors.gender} className="mt-2" />      
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="text-[14px] mb-4">住所</div>


                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">郵便番号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <div>
                                            <TextInput
                                                type="text"
                                                name="post_number"
                                                value={personalInfoForm.data.post_number}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handlePersonalInfoSetData('post_number', e.target.value)}
                                            />
                                            <InputError message={personalInfoForm.errors.post_number} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2 pt-1">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">都道府県</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <div>
                                            <CustomSelect
                                                id="personal"
                                                first="都道府県"
                                                className="w-full"
                                                currentOption={personalInfoForm.data.pref}
                                                options={prefs}
                                                onSelect={ (value) => { handlePersonalInfoSetData('pref', value) } }
                                            />
                                            <InputError message={personalInfoForm.errors.pref} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">市区町村</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <div >
                                            <TextInput
                                                type="text"
                                                name="city"
                                                value={personalInfoForm.data.city}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handlePersonalInfoSetData('city', e.target.value)}
                                            />
                                            <InputError message={personalInfoForm.errors.city} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">町域</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="area"
                                            value={personalInfoForm.data.area}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handlePersonalInfoSetData('area', e.target.value)}
                                        />
                                        <InputError message={personalInfoForm.errors.area} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">丁目・番地・号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="street"
                                            value={personalInfoForm.data.street}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handlePersonalInfoSetData('street', e.target.value)}
                                        />
                                        <InputError message={personalInfoForm.errors.street} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">建物名・階数・部屋番号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="building"
                                            value={personalInfoForm.data.building}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handlePersonalInfoSetData('building', e.target.value)}
                                        />
                                        <InputError message={personalInfoForm.errors.building} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">お住まいの国</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <TextInput
                                        type="text"
                                        name="country"
                                        value={personalInfoForm.data.country}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handlePersonalInfoSetData('country', e.target.value)}
                                    />
                                    <InputError message={personalInfoForm.errors.country} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">本人確認</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">未完了</div>
                                    <button className="text-[14px] text-[#3370ff]">登録</button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center my-12">
                            <PrimaryButton
                                onClick={personalInfoSubmit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80"
                            >
                                保存する
                            </PrimaryButton>
                        </div>

                        <Link className="border-b border-t border-gray-200 flex items-center justify-between h-16">
                            <div className="text-[14px]">本人情報を編集したい</div>
                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                        </Link>
                        <Link className="border-b border-gray-200 flex items-center justify-between h-16">
                            <div className="text-[14px]">本人確認について</div>
                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                        </Link>
                    </div>

                </div>

                <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-4 font-bold">事業者情報</div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">事業形態</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <CustomSelect
                                        className="w-full"
                                        currentOption={businessInfoForm.data.user_type}
                                        options={business_types}
                                        onSelect={(value) => {handleBusinessInfoSetData('user_type', value)}} />
                                    <InputError message={businessInfoForm.errors.user_type} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">事業者名・屋号</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <TextInput
                                        type="text"
                                        name="business_name"
                                        value={businessInfoForm.data.business_name}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handleBusinessInfoSetData('business_name', e.target.value)}
                                    />
                                    <InputError message={businessInfoForm.errors.business_name} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">事業者名・屋号ガナ</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <TextInput
                                        type="text"
                                        name="business_kana"
                                        value={businessInfoForm.data.business_kana}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handleBusinessInfoSetData('business_kana', e.target.value)}
                                    />
                                    <InputError message={businessInfoForm.errors.business_kana} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="text-[14px] mb-4">住所</div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">郵便番号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <div >
                                            <TextInput
                                                type="text"
                                                name="business_post_number"
                                                value={businessInfoForm.data.business_post_number}
                                                className="mt-1 block w-full pr-8"
                                                onChange={(e) => handleBusinessInfoSetData('business_post_number', e.target.value)}
                                            />
                                            <InputError message={businessInfoForm.errors.business_post_number} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2 pt-1">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">都道府県</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <CustomSelect
                                            id="business"
                                            first="都道府県"
                                            className="w-full"
                                            currentOption={businessInfoForm.data.business_pref}
                                            options={prefs}
                                            onSelect={ (value) => { handleBusinessInfoSetData('business_pref', value) } }
                                        />
                                        <InputError message={businessInfoForm.errors.business_pref} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">市区町村</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="business_city"
                                            value={businessInfoForm.data.business_city}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('business_city', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.business_city} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">町域</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="business_area"
                                            value={businessInfoForm.data.business_area}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('business_area', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.business_area} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">丁目・番地・号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="business_street"
                                            value={businessInfoForm.data.business_street}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('business_street', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.business_street} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[14px]">建物名・階数・部屋番号</div>
                                    <div className="relative text-[14px] grow max-w-[500px]">
                                        <TextInput
                                            type="text"
                                            name="business_building"
                                            value={businessInfoForm.data.business_building}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleBusinessInfoSetData('business_building', e.target.value)}
                                        />
                                        <InputError message={businessInfoForm.errors.business_building} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">電話番号</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <TextInput
                                        type="text"
                                        name="business_phone_number"
                                        value={businessInfoForm.data.business_phone_number}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handleBusinessInfoSetData('business_phone_number', e.target.value)}
                                    />
                                    <InputError message={businessInfoForm.errors.business_phone_number} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">インボイス番号</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <TextInput
                                        type="number"
                                        name="business_invoice_number"
                                        value={businessInfoForm.data.business_invoice_number}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handleBusinessInfoSetData('business_invoice_number', e.target.value)}
                                    />
                                    <InputError message={businessInfoForm.errors.business_invoice_number} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="text-center my-12">
                            <PrimaryButton
                                onClick={businessInfoSubmit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80"
                            >
                                保存する
                            </PrimaryButton>
                        </div>

                        <Link className="border-b border-t border-gray-200 flex items-center justify-between h-16">
                            <div className="text-[14px]">個人情報へ登録を変更したい</div>
                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                        </Link>
                    </div>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
