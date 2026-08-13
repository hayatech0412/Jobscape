import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import InputLabel from '@/Components/InputLabel';
import BackButton from '@/Components/BackButton';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import CustomRadioButtons from "@/Components/CustomRadioButtons";
import CustomCheckbox from "@/Components/CustomCheckbox";
import ArrowRightTop from "@/Components/Icons/ArrowRightTop";
import { Head, Link, useForm } from '@inertiajs/react';

export default function MainInfoCorporation({
    Genders,
    Profile,
    prefs,
    user_type,
    corportate_types,
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
        business_company_name : Profile.business_company_name ?? '',
        business_name : Profile.business_name ?? '',
        business_kana : Profile.business_kana ?? '',
        business_number : Profile.business_number ?? '',
        business_post_number : Profile.business_post_number ?? '',
        business_pref : Profile.business_pref ?? '',
        business_city : Profile.business_city ?? '',
        business_area : Profile.business_area ?? '',
        business_street : Profile.business_street ?? '',
        business_building : Profile.business_building ?? '',
        business_phone_number : Profile.business_phone_number ?? '',
        business_invoice_number : Profile.business_invoice_number ?? '',
        business_master_first_name : Profile.business_master_first_name ?? '',
        business_master_last_name : Profile.business_master_last_name ?? '',
        business_master_first_kana : Profile.business_master_first_kana ?? '',
        business_master_last_kana : Profile.business_master_last_kana ?? '',
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

    const isAddressSame = () => {
        if (data.post_number == '' && data.pref == '' && data.city == '' && data.area == '' && data.street == '' && data.building == '') { return false; }
        return data.post_number == data.business_post_number &&
                data.pref == data.business_pref &&
                data.city == data.business_city &&
                data.area == data.business_area &&
                data.street == data.business_street &&
                data.building == data.business_building;
    }

    const sameAddress = () => {
        setData({
            ...data,
            business_post_number: data.post_number,
            business_pref: data.pref,
            business_city: data.city,
            business_area: data.area,
            business_street: data.street,
            business_building: data.building,
        });
    }

    const isPhoneNumberSame = () => {
        if (Profile.phone_number == '') return false;
        return Profile.phone_number == data.business_phone_number;
    }

    const samePhoneNumber = () => {
        setData({
            ...data,
            business_phone_number: Profile.phone_number
        });
    }

    const isNameSame = () => {
        if (data.last_name == '' && data.first_name == '' && data.last_kana == '' && data.first_kana == '') { return false; }
        return data.last_name == data.business_master_last_name &&
                data.first_name == data.business_master_first_name &&
                data.last_kana == data.business_master_last_kana &&
                data.first_kana == data.business_master_first_kana;
    }

    const sameName = () => {
        setData({
            ...data,
            business_master_last_name: data.last_name,
            business_master_first_name: data.first_name,
            business_master_last_kana: data.last_kana,
            business_master_first_kana: data.first_kana,
        })
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('register.maininfo.store'), {
            onFinish: () => {},
        });
    };

    return (
        <div className="">
            <div className="border border-gray-200 rounded-md px-[8%] py-[4%] mb-16 ">
                <div className="my-8">
                    <div className="text-[18px] mb-2">ご利用者情報</div>
                    <div className="text-[12px]">本人確認書類の情報通りご入力ください。</div>
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

                <InputError message={ errors.last_name ?? errors.first_name ?? errors.last_kana ?? errors.first_kana } className="mt-2" />

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

                <div className="mt-12 pb-12 mb-12 border-b border-gray-200">
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
                                id="cor1"
                                first=" "
                                className="w-full"
                                currentOption={data.pref}
                                options={prefs}
                                onSelect={ (value) => { handleSetData('pref', value) } }
                            />
                        </div>
                    </div>
                    <InputError message={ errors.post_number ?? errors.pref} className="mt-2" />

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

                <div className=" mt-12 mb-6 pb-4">
                    <InputLabel className="mb-2" htmlFor="gender" value="性別" type="任意" />
                    <div className="">
                        <CustomRadioButtons id="gender" currentOption={data.gender} options={Genders} onChange={setGender} />
                    </div>
                    <InputError message={errors.gender} className="mt-2" />
                    <div className="font-normal text-[12px] mt-6">※サービス向上のため使用します。公開されることはありません。</div>
                </div>

            </div>

            <div className="border border-gray-200 rounded-md px-[8%] py-[4%] ">
                <div className="my-8">
                    <div className="text-[18px] mb-2">事業者情報</div>
                    <div className="text-[12px]">振込口座登録や、領収書等の各種書類を法人名義で取得したい場合はご入力ください。</div>
                </div>

                <div className="">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                        <div className="font-semibold text-[15px]">法人情報</div>
                    </div>

                    <div className="mb-4">
                        <div className="text-[12px]" >法人呼称</div>
                        <CustomSelect
                            id="personal"
                            first="選択してください"
                            className="w-full"
                            currentOption={data.business_company_name}
                            options={corportate_types}
                            onSelect={ (value) => { handleSetData('business_company_name', value) } }
                        />
                        <InputError message={ errors.business_company_name } className="mt-2" />
                        <div className="text-[12px] mt-2">選択肢にない場合は、「その他」を選択してください</div>
                    </div>

                    <div className="mb-4">
                        <div className="text-[12px]" >法人名</div>
                        <TextInput
                            type="text"
                            name="business_name"
                            value={data.business_name}
                            className="mt-1 block w-full pr-8"
                            placeholder="JOBSCAPE"
                            onChange={(e) => handleSetData('business_name', e.target.value)}
                        />
                        <InputError message={ errors.business_name } className="mt-2" />
                        <div className="text-[12px] mt-2">法人呼称を省いて入力してください</div>
                    </div>

                    <div className="mb-4">
                        <div className="text-[12px]" >法人名カナ</div>
                        <TextInput
                            type="text"
                            name="business_kana"
                            value={data.business_kana}
                            className="mt-1 block w-full pr-8"
                            placeholder="ジョブスケープ"
                            onChange={(e) => handleSetData('business_kana', e.target.value)}
                        />
                        <InputError message={ errors.business_kana } className="mt-2" />
                        <div className="text-[12px] mt-2">法人呼称を省いてカタカナ入力してください</div>
                    </div>

                    <div className="mb-4">
                        <div className="text-[12px]" >法人番号</div>
                        <TextInput
                            type="number"
                            name="business_number"
                            value={data.business_number}
                            className="mt-1 block w-full pr-8"
                            placeholder="1234567890123"
                            onChange={(e) => handleSetData('business_number', e.target.value)}
                        />
                        <InputError message={ errors.business_number } className="mt-2" />
                    </div>
                </div>

                <div className="mt-12 pb-12 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 ">
                            <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                            <div className="font-semibold text-[15px]">事業所住所</div>
                        </div>
                        <CustomCheckbox
                            checked={isAddressSame()}
                            label="利用者住所と同じ"
                            onChange={(checked) => {
                                if (checked) sameAddress();
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="">
                            <div className="text-[12px]" >郵便番号</div>
                            <TextInput
                                type="number"
                                name="business_post_number"
                                value={data.business_post_number}
                                className="mt-1 block w-full pr-8"
                                placeholder="例：1040045"
                                onChange={(e) => handleSetData('business_post_number', e.target.value)}
                            />
                        </div>
                        <div className="">
                            <div className="text-[12px] mb-1" >都道府県</div>
                            <CustomSelect
                                id="corporation"
                                first=" "
                                className="w-full"
                                currentOption={data.business_pref}
                                options={prefs}
                                onSelect={ (value) => { handleSetData('business_pref', value) } }
                            />
                        </div>
                    </div>
                    <InputError message={errors.business_post_number ?? errors.business_pref} className="mt-2" />

                    <div className="mt-3">
                        <div className="text-[12px]" >市区町村</div>
                        <TextInput
                            type="text"
                            name="business_city"
                            value={data.business_city}
                            className="mt-1 block w-full pr-8"
                            placeholder="例：中央区"
                            onChange={(e) => handleSetData('business_city', e.target.value)}
                        />
                        <InputError message={errors.business_city} className="mt-2" />
                    </div>

                    <div className="mt-3">
                        <div className="text-[12px]" >町域</div>
                        <TextInput
                            type="text"
                            name="business_area"
                            value={data.business_area}
                            className="mt-1 block w-full pr-8"
                            placeholder="例：築地"
                            onChange={(e) => handleSetData('business_area', e.target.value)}
                        />
                        <InputError message={errors.business_area} className="mt-2" />
                    </div>

                    <div className="mt-3">
                        <div className="text-[12px]" >丁目・番地・号</div>
                        <TextInput
                            type="text"
                            name="street"
                            value={data.business_street}
                            className="mt-1 block w-full pr-8"
                            placeholder="例：3-4-13"
                            onChange={(e) => handleSetData('business_street', e.target.value)}
                            />
                        <InputError message={errors.business_street} className="mt-2" />
                    </div>

                    <div className="mt-3">
                        <div className="text-[12px]" >建物名・階数・部屋番号</div>
                        <TextInput
                            type="text"
                            name="business_building"
                            value={data.business_building}
                            className="mt-1 block w-full pr-8"
                            placeholder="例：電気工事会館　5階"
                            onChange={(e) => handleSetData('business_building', e.target.value)}
                        />
                        <InputError message={errors.business_building} className="mt-2" />
                    </div>
                </div>

                <div className="mt-12 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 ">
                            <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                            <div className="font-semibold text-[15px]">事業所電話番号</div>
                        </div>
                        <CustomCheckbox
                            checked={isPhoneNumberSame()}
                            label="認証済み利用者電話番号と同じ"
                            onChange={(checked) => {
                                if (checked) samePhoneNumber();
                            }}
                        />
                    </div>

                    <div className="mt-3">
                        <div className="text-[12px]" >電話番号</div>
                        <TextInput
                            type="text"
                            name="business_phone_number"
                            value={data.business_phone_number}
                            className="mt-1 block w-full pr-8"
                            placeholder="例：0345678910"
                            inputMode="numeric"
                            onChange={(e) => handleSetData('business_phone_number', e.target.value)}
                        />
                        <InputError message={errors.business_phone_number} className="mt-2" />
                        <div className="text-[12px] mt-2">ハイフンなしで入力してください</div>
                    </div>
                </div>

                <div className="mt-12 ">
                    <div className="flex items-center mb-4 gap-2">
                        <div className="flex items-center gap-3 ">
                            <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                            <div className="font-semibold text-[15px]">インボイス登録番号</div>
                        </div>
                        <div className="flex items-center h-[20px] rounded-sm text-[10px] leading-none px-2 py-[3px] bg-gray-500 text-white">任意</div>
                    </div>

                    <div className="mt-3">
                        <div className="flex items-center gap-2">
                            <div className="leading-none">T-</div>
                            <TextInput
                                type="number"
                                name="business_invoice_number"
                                value={data.business_invoice_number}
                                className="mt-1 block w-full pr-8"
                                placeholder="例：12345678910111"
                                onChange={(e) => handleSetData('business_invoice_number', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.business_invoice_number} className="mt-2" />
                        <div className="text-[12px] mt-2">T-以降の数字を入力してください</div>
                    </div>
                </div>

                <div className="mt-12 pb-12 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 ">
                            <div className="bg-[#3370ff] w-2 h-2 rounded-full"></div>
                            <div className="font-semibold text-[15px]">事業所代表者情報</div>
                        </div>
                        <CustomCheckbox
                            checked={isNameSame()}
                            label="利用者氏名と同じ"
                            onChange={(checked) => {
                                if (checked) sameName();
                            }}
                        />
                    </div>

                    <div className="mt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="">
                                <div className="text-[12px]" >姓</div>
                                <TextInput
                                    type="text"
                                    name="business_master_last_name"
                                    value={data.business_master_last_name}
                                    className="mt-1 block w-full"
                                    placeholder="例：山田"
                                    onChange={(e) => handleSetData('business_master_last_name', e.target.value)}
                                />
                            </div>

                            <div className="">
                                <div className="text-[12px]" >名</div>
                                <TextInput
                                    type="text"
                                    name="business_master_first_name"
                                    value={data.business_master_first_name}
                                    className="mt-1 block w-full"
                                    placeholder="例：太郎"
                                    onChange={(e) => handleSetData('business_master_first_name', e.target.value)}
                                />
                            </div>

                            <div className="">
                                <div className="text-[12px]" >姓カナ</div>
                                <TextInput
                                    type="text"
                                    name="business_master_last_kana"
                                    value={data.business_master_last_kana}
                                    className="mt-1 block w-full"
                                    placeholder="例：ヤマダ"
                                    onChange={(e) => handleSetData('business_master_last_kana', e.target.value)}
                                />
                            </div>

                            <div className="">
                                <div className="text-[12px]" >名カナ</div>
                                <TextInput
                                    type="text"
                                    name="business_master_first_kana"
                                    value={data.business_master_first_kana}
                                    className="mt-1 block w-full"
                                    placeholder="例：タロウ"
                                    onChange={(e) => handleSetData('business_master_first_kana', e.target.value)}
                                />
                            </div>
                        </div>
                        <InputError message={ errors.business_master_last_name ?? errors.business_master_first_name ?? errors.business_master_last_kana ?? errors.business_master_first_kana } className="mt-2" />

                    </div>
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
