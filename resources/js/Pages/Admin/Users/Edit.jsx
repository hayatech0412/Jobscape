import React, { useState, useEffect, useRef } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import { Toast } from 'primereact/toast';
import ShieldWithCheck from '@/Components/Icons/ShieldWithCheck';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ReloadIcon from '@/Components/Icons/ReloadIcon';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import CameraIcon from '@/Components/Icons/CameraIcon';
import CustomSelect from '@/Components/CustomSelect';
import CustomRadioButtons from "@/Components/CustomRadioButtons";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import EmailChangeModal from '@/Components/EmailChangeModal';
import PasswordChangeModal from '@/Components/PasswordChangeModal';
import PhoneNumberChangeModal from '@/Components/PhoneNumberChangeModal';
import CategoryChangeModal from '@/Components/CategoryChangeModal';
import AreaChangeModal from '@/Components/AreaChangeModal';
import dayjs from 'dayjs';

export default function Edit({
    user,
    profile,
    categories,
    category_ids,
    area_categories,
    prefs,
    Genders,
}) {
    const buttonRef = useRef(null);
    const toast = useRef(null);

    const [profileImage, setProfileImage] = useState(user.avatar_url);
    
    // image 
    const imageForm = useForm({
        image: null,
    }); 
    
    const triggerClick = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    };

    const selectImage = () => {
        triggerClick();
    }

    const handleImageSubmit = () => {
        imageForm.post(route('admin.account.info.image', [user.id]), {
            onFinish: () => {
                toast.current.show({
                    severity: 'success',
                    summary: '成功',
                    detail: '画像を更新しました。'
                });
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // const reader = new FileReader();
            // imageForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                
                imageForm.setData('image', file);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (imageForm.data.image && imageForm.data.image.size / 1024 > 2048) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'エラー', 
                detail: '画像のサイズは2MB以下にしてください。' // エラーメッセージを適切に設定
            });
            return; // 修正：タイポ
        }

        if (imageForm.data.image) {
            handleImageSubmit()
        }
        
    }, [imageForm.data.image]);

    // submit data
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        nickname: profile.nickname ?? '',
        appeal_statement: profile.appeal_statement ?? '',
        introduction: profile.introduction ?? '',
        extra_email: profile.extra_email ?? '',
        is_monitor: profile?.is_monitor
    });
      
    const submit = () => {
        post(route('admin.account.info.store', [user.id]), {
            onFinish: () => {
                
            },
        });
    }

    const [isEmailChange, setIsEmailChange] =useState(false);
    const [isPasswordChange, setIsPasswordChange] =useState(false);
    const [isPhoneNumberChange, setIsPhoneNumberChange] =useState(false);
    const [isCategoryChange, setIsCategoryChange] =useState(false);
    const [isAreaChange, setIsAreaChange] =useState(false);

    const handleSetData = (key, value) => {
        console.log(key, value)
        setData({...data, [key]: value});
    }

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

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setData({ ...data, [name]: checked });
    };
    
    const setGender = (value) => {
        personalInfoForm.setData({...personalInfoForm.data, gender: value});
    };

    const businessInfoForm = useForm({
        user_type: profile.user_type ?? '',
        business_name: profile.business_name ?? '',
        business_kana: profile.business_kana ?? '',
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
        personalInfoForm.post(route('admin.account.business.personal.store', [user.id]), {
            onFinish: () => {

            },
        });
    }

    const businessInfoSubmit = () => {
        businessInfoForm.post(route('admin.account.business.store', [user.id]), {
            onFinish: () => {

            },
        });
    }
    
    return (
        <AdminAuthLayout>            
            <Toast ref={toast} /> 
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">

                <div className="w-[92%] mx-auto my-[4%] pt-[50px] pb-[35px] bg-white border border-gray-200 rounded-lg shadow-md mt-[70px] md:mt-[90px] mb-[6%]">
                    <div className="flex items-center justify-center cursor-pointer">
                        <div onClick={selectImage} className="relative w-24 h-24 border-[3px] border-white rounded-full -mt-32">
                            <img className="w-full h-full rounded-full object-cover" src={profileImage} alt="Profile" />
                            <div className="absolute -bottom-3 right-2 rounded-full bg-white border border-gray-600 size-7 flex items-center justify-center">
                                <CameraIcon className="size-4" />
                            </div>
                        </div>
                        <input ref={buttonRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>
                    <div className="text-[20px] mb-2 font-bold text-center">{profile.nickname}</div>
                    
                    {/* <div className="flex flex-col items-center gap-2">
                        <Link href={route('payments.plan')} className="text-[#3370ff] text-[12px]">{profile.plan?.name}</Link>
                        <button className="bg-[#3370ff] rounded-full text-white text-[11px] py-[5px] px-[10px] leading-none">
                            ランクアップする
                        </button>
                    </div> */}

                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-4 font-bold">アカウント情報</div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">ニックネーム</div>
                                <div className="text-[14px] grow max-w-[500px]">
                                    <div className="relative">
                                        <TextInput
                                            id="nickname"
                                            type="text"
                                            name="nickname"
                                            value={data.nickname}
                                            className="mt-1 block w-full pr-8"
                                            onChange={(e) => handleSetData('nickname', e.target.value.substring(0, 20))}
                                        />
                                        <div className="absolute right-2 bottom-2 text-[12px]">/20</div>
                                    </div>
                                    <InputError message={errors.nickname} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 py-3 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">アピール文</div>
                                <div className="text-[14px] grow max-w-[500px]">
                                    <div className="relative">
                                        <textarea
                                            className="w-full p-3 pr-8 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[14px]" 
                                            rows="2"
                                            value={data.appeal_statement}
                                            onChange={(e) => handleSetData('appeal_statement', e.target.value.substring(0, 50))}
                                        />
                                        <div className="absolute right-2 bottom-3 text-[12px]">/50</div>
                                    </div>
                                    <InputError message={errors.appeal_statement} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 py-3 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">自己紹介文</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <div className="relative">
                                        <textarea
                                            className="w-full p-3 pr-6 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[14px]" 
                                            rows="5"
                                            value={data.introduction}
                                            onChange={(e) => handleSetData('introduction', e.target.value.substring(0, 1000))}
                                        />
                                        <div className="absolute right-2 bottom-3 text-[12px]">/1000</div>
                                    </div>
                                    <InputError message={errors.introduction} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">個人メールアドレス（非公開）</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{user.email}</div>
                                    <button onClick={() => {setIsEmailChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">現在のパスワード（非公開）</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">**********</div>
                                    <button onClick={() => {setIsPasswordChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">メールアドレスの追加</div>
                                <div className="relative text-[14px] grow max-w-[500px]">
                                    <TextInput
                                        id="extra_email"
                                        type="email"
                                        name="extra_email"
                                        value={data.extra_email}
                                        className="mt-1 block w-full pr-8"
                                        onChange={(e) => handleSetData('extra_email', e.target.value)}
                                    />
                                    <InputError message={errors.extra_email} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        
                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">電話番号（非公開）</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{profile.phone_number}</div>
                                    <button onClick={() => {setIsPhoneNumberChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">関心のあるカテゴリ</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {
                                            profile.categories?.map((category, index) => (
                                                <span key={category.id + "-category-"+index}>{category.name}{(profile.categories.length - 1) != index ? ' / ' : ''}</span>
                                            ))
                                        }
                                    </div>
                                    <button onClick={() => {setIsCategoryChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">希望する商材の地域</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {
                                            JSON.parse(profile.prefectures)?.map((area, index) => (
                                                <span key={area + "-area-"+index}>{area}{(JSON.parse(profile.prefectures)?.length - 1) != index ? '/' : ''}</span>
                                            ))
                                        }
                                    </div>
                                    <button onClick={() => {setIsAreaChange(true)}} className="text-[14px] text-[#3370ff]">編集</button>
                                </div>
                            </div>
                        </div>
                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">モニター</div>
                                <div className="relative text-[14px] grow max-w-[500px] min-h-[42px] flex items-center justify-end gap-6">
                                   <div className="text-[14px]"></div>
                                    <input
                                        type="checkbox"
                                        name="is_monitor"
                                        checked={data.is_monitor}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-12">
                            <PrimaryButton 
                                onClick={submit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80" 
                            >
                                保存する
                            </PrimaryButton>
                        </div>
                    </div>   

                </div>

                <EmailChangeModal
                    user={user}
                    isOpen={isEmailChange}
                    onClose={() => {setIsEmailChange(false)}}
                />
                <PasswordChangeModal
                    user={user}
                    isOpen={isPasswordChange}
                    onClose={() => {setIsPasswordChange(false)}}
                />
                <PhoneNumberChangeModal
                    user={user}
                    isOpen={isPhoneNumberChange}
                    onClose={() => {setIsPhoneNumberChange(false)}}
                />
                <CategoryChangeModal
                    user={user}
                    categories = {categories}
                    category_ids = {category_ids}
                    isOpen={isCategoryChange}
                    onClose={() => {setIsCategoryChange(false)}}
                />

                <AreaChangeModal
                    user={user}
                    profile = {profile}
                    area_categories = {area_categories}
                    isOpen={isAreaChange}
                    onClose={() => {setIsAreaChange(false)}}
                />                

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

                        <div className="text-center my-12">
                            <PrimaryButton
                                onClick={personalInfoSubmit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80"
                            >
                                保存する
                            </PrimaryButton>
                        </div>
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
                    </div>
                </div>
            </div>
        </AdminAuthLayout>
    );
}
