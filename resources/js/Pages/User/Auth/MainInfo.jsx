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
import MainInfoPerson from "./MainInfoPerson";
import MainInfoCorporation from "./MainInfoCorporation";
import MainInfoProprietor from "./MainInfoProprietor";
import ArrowRightTop from "@/Components/Icons/ArrowRightTop";
import { Head, Link, useForm } from '@inertiajs/react';

export default function MainInfo({
    Genders,
    Profile,
    UserType,
    prefs,
    CorporateTypes,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_type : Profile.user_type ?? 1,
    });

    const afterRegister = (e) => {

        post(route('register.maininfo.after'), {
            onFinish: () => {},
        });
    }

    return (
        <GuestLayout>
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.phone.number.verify')} className="w-6 h-6 my-6"></BackButton>
            </div>

            <div className="w-[92%] max-w-[1024px] mx-auto mb-20 md:mb-20 bg-white">
                <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                    <div className="text-[20px] mb-8">本人情報の登録</div>
                    <p className="text-[12px] leading-6 mb-4">
                        JOBSCAPEは<Link className="text-[#3370ff]">原則個人利用、会員ご本人様のみ</Link>お使いいただけるサービスです。活動形態、納税の目的等で法人・個人事業主の方が事業者登録をいただくことも可能です。
                        その場合、個人登録、または事業者登録のいずれか1つをご選択ください。<br /><br />
                        ご入力いただいた情報は本人確認、お客様に合った情報表示、年齢制限、その他の目的で使用いたします。マイページより後から登録することも可能です。
                    </p>

                    <Link className="flex leading-none text-[12px] text-[#3370ff] mb-12">
                        本人情報の登録について<ArrowRightTop className="w-3 h-3"></ArrowRightTop>
                    </Link>

                    <div className="flex justify-between items-center my-8">
                        <div className="">
                            <CustomRadioButtons currentOption={data.user_type} id="user_type" options={UserType} className="gap-4" onChange={(value) => {setData({...data, user_type: value})}} />
                        </div>
                        <button onClick={afterRegister} className="w-28 h-8 border border-[#3370ff] text-[#3370ff] text-[12px] rounded-full">あとで登録</button>
                    </div>

                    {data.user_type == 1 ? (
                        <MainInfoPerson
                            user_type = {data.user_type}
                            Genders={Genders}
                            Profile={Profile}
                            errors={errors}
                            prefs={prefs}
                        />
                    ) : (
                        data.user_type == 2 ? (
                            <MainInfoCorporation
                                user_type = {data.user_type}
                                corportate_types = {CorporateTypes}
                                Genders={Genders}
                                Profile={Profile}
                                errors={errors}
                                prefs={prefs}
                            />
                        ) : (
                            <MainInfoProprietor
                                user_type = {data.user_type}
                                Genders={Genders}
                                Profile={Profile}
                                errors={errors}
                                prefs={prefs}
                            />
                        )
                    )}

                </div>
            </div>
        </GuestLayout>
    );
}
