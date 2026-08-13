import React, { useState, useEffect, useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import ArrowRight from '@/Components/Icons/ArrowRight';
import CameraIcon from '@/Components/Icons/CameraIcon';
import ShieldWithCheck from '@/Components/Icons/ShieldWithCheck';
import PrimaryButton from '@/Components/PrimaryButton';
import EmailChangeModal from '@/Components/EmailChangeModal';
import PasswordChangeModal from '@/Components/PasswordChangeModal';
import PhoneNumberChangeModal from '@/Components/PhoneNumberChangeModal';
import CategoryChangeModal from '@/Components/CategoryChangeModal';
import AreaChangeModal from '@/Components/AreaChangeModal';

export default function AccountInfo({
    profile,
    categories,
    category_ids,
    area_categories,
    prefs,
}) {
    const buttonRef = useRef(null);
    const toast = useRef(null);

    const {auth} = usePage().props;

    const formRef = useRef(null);

    const [profileImage, setProfileImage] = useState(auth.user.avatar_url);
    
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
        imageForm.post(route('account.info.image'), {
            onFinish: () => {
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
    });
      
    const submit = () => {
        post(route('account.info.store'), {
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
        setData({...data, [key]: value});
    }
    
    return (
        <UserAuthMainLayout>            
            <Toast ref={toast} /> 
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">

                <div className="w-[92%] mx-auto my-[4%]  pt-[50px] pb-[35px] bg-white border border-gray-200 rounded-lg shadow-md mt-[70px] md:mt-[120px] mb-10">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
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
                        {/* <div className="flex items-center justify-center">
                            <div className="flex items-center gap-1 text-[#3370ff] text-[13px] pb-4 px-12 border-b border-gray-300 mb-4">
                                <ShieldWithCheck className={"w-6 h-6"} />     
                                <span className="text-gray-700">法人認証済</span>
                            </div> 
                        </div> */}
                        
                        <div className="flex flex-col items-center gap-2">
                            <Link href={route('payments.plan')} className="text-[#3370ff] text-[12px]">{profile.plan.name}</Link>
                            <button className="bg-[#3370ff] rounded-full text-white text-[11px] py-[5px] px-[10px] leading-none">
                                ランクアップする
                            </button>
                        </div>
                    </div>
                </div>



                <div className="w-[92%] mx-auto my-[4%] mb-[6%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
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
                                    <div className="text-[14px]">{auth.user.email}</div>
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
                                                <span key={category.id + "-category"+index}>{category.name}{(profile.categories.length - 1) != index ? '/ ' : ''}</span>
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

                        <div className="text-center mt-12">
                            <PrimaryButton 
                                onClick={submit}
                                className="text-center h-[50px] ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80" 
                            >
                                保存する
                            </PrimaryButton>
                        </div>
                    </div>   

                </div>

                <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-8 font-bold">アカウントの休止・削除</div>

                        <div className="pb-6 border-b border-gray-200 mb-8">
                            <div className="flex items-ceneter justify-between mb-4">
                                <div className="text-[14px]">JOBSCAPEアカウントを休止する</div>
                                <Link className="text-[14px] text-[#3370ff]">アカウントを休止する</Link>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-[12px] max-w-[500px]">
                                    最長1年間、アカウントの休止が可能です。<br />
                                    休止中は会費が発生しませんが、サービスの利用は停止・制限されます。売上金の振込申請は継続してご利用いただけます。詳しくはヘルプをご確認ください。
                                </div>
                                <Link className="text-[14px] text-[#3370ff]">プランをダウングレードする</Link>
                            </div>
                        </div>

                        <div className="pb-6 border-b border-gray-200 mb-24">
                            <div className="flex items-ceneter justify-between mb-4">
                                <div className="text-[14px]">JOBSCAPEアカウントを休止する</div>
                                <Link className="text-[14px] text-[#3370ff]">アカウントを削除する</Link>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-[12px] max-w-[500px]">
                                    アカウントを削除すると、すべてのデータが完全に削除され、復元できません。
                                    再度ご利用いただく場合は、新たに会員登録が必要です。取引が継続中の場合、削除後に成立した取り引き・売上金は権利廃棄となります。詳しくはヘルプをご確認ください。
                                </div>
                                <Link className="text-[14px] text-[#3370ff]">プランをダウングレードする</Link>
                            </div>
                        </div>

                        <Link className="border-b border-t border-gray-200 flex items-center justify-between h-16">
                            <div className="text-[14px]">アカウントを休止したい</div>
                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                        </Link>
                        <Link className="border-b border-gray-200 flex items-center justify-between h-16">
                            <div className="text-[14px]">アカウントを削除したい</div>
                            <ArrowRight className="h-4 w-4 text-[#3370ff]" />
                        </Link>
                    </div>
                </div>

                <EmailChangeModal
                    isOpen={isEmailChange}
                    onClose={() => {setIsEmailChange(false)}}
                />
                <PasswordChangeModal
                    isOpen={isPasswordChange}
                    onClose={() => {setIsPasswordChange(false)}}
                />
                <PhoneNumberChangeModal
                    isOpen={isPhoneNumberChange}
                    onClose={() => {setIsPhoneNumberChange(false)}}
                />
                <CategoryChangeModal
                    categories = {categories}
                    category_ids = {category_ids}
                    isOpen={isCategoryChange}
                    onClose={() => {setIsCategoryChange(false)}}
                />

                <AreaChangeModal
                    profile = {profile}
                    area_categories = {area_categories}
                    isOpen={isAreaChange}
                    onClose={() => {setIsAreaChange(false)}}
                />
                
            </div>
        </UserAuthMainLayout>
    );
}
