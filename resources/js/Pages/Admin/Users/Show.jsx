import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import ShieldWithCheck from '@/Components/Icons/ShieldWithCheck';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ReloadIcon from '@/Components/Icons/ReloadIcon';
import TextInput from '@/Components/TextInput';
import CustomSelect from '@/Components/CustomSelect';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AdminPageNavs from '@/Components/Admin/AdminPageNavs';
import dayjs from 'dayjs';

export default function Show({
    user,
    profile,
    now,
}) {
    const {auth} = usePage().props;
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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

    const handleSetData = (key, value) => {
        setData({...data, [key]: value});
    }

    function formatDate(dateString) {
        return dayjs(dateString).format("YYYY/MM/DD");
    }

    const business_types = [
        {label: '法人', value: '2', key: 'CORPORATION'},
        {label: '個人事業主', value: '3', key: 'PROPRIETOR'},
    ]

    const toggleModal = () => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
    }

    const deleteUser = () => {
        post(route('admin.users.delete', [user.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            }
        });
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    return (
        <AdminAuthLayout>
            <div className="mt-20 mb-6">
                <div className="w-[92%] mx-auto mt-[4%] mb-6 py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="flex items-center justify-center">
                        <div className="relative border-[3px] border-white rounded-full -mt-28">
                            <img className="w-24 h-24 rounded-full object-cover" src={user.avatar_url} alt="Profile" />
                        </div>
                    </div>

                    <div className=" w-[92%] mx-auto text-[20px] mb-4 font-bold">アカウント情報</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 w-[92%] mx-auto">

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">氏名</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{profile.last_name} {profile.first_name}</div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">氏名カナ</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{profile.last_kana} {profile.first_kana}</div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">ニックネーム</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{data.nickname}</div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">メールアドレス</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{user.email}</div>
                                    {/* <button onClick={() => {setIsEmailChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> */}
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">追加メールアドレス</div>
                                <div className="text-[14px]">{profile.extra_email}</div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">電話番号</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{profile.phone_number}</div>
                                    {/* <button onClick={() => {setIsPhoneNumberChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> */}
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">生年月日</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{formatDate(profile.birthday)}</div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">郵便番号</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{ profile.post_number} </div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">住所</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{profile.pref} {profile.city} {profile.area} {profile.street} {profile.building}</div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">お住まいの国</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{profile.country}</div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">本人確認</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">{profile.sms_verified_at ? '完了' : '未完了'}</div>
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">関心のあるカテゴリ</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {
                                            profile.categories?.map((category, index) => (
                                                <span key={category.id + "-category"+index}>{category.name}{(profile.categories.length - 1) != index ? '/ ' : ''}</span>
                                            ))
                                        }
                                    </div>
                                    {/* <button onClick={() => {setIsCategoryChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> */}
                                </div>
                            </div>
                        </div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">希望する商材の地域</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {
                                            JSON.parse(profile.prefectures)?.map((area, index) => (
                                                <span key={area + "-area-"+index}>{area}{(JSON.parse(profile.prefectures)?.length - 1) != index ? '/' : ''}</span>
                                            ))
                                        }
                                    </div>
                                    {/* <button onClick={() => {setIsAreaChange(true)}} className="text-[14px] text-[#3370ff]">編集</button> */}
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 py-3 hidden md:block"></div>

                        <div className="pt-4 py-3 border-b border-gay-200">
                            <div className="flex items-start justify-between gap-2">
                                <div className="text-[14px]">アピール文</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {profile.appeal_statement}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 py-3 border-b border-gay-200">
                            <div className="flex items-start justify-between gap-2">
                                <div className="text-[14px]">自己紹介文</div>
                                <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                    <div className="text-[14px]">
                                        {profile.introduction}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    user.user_type != '1' && (
                        <div className="w-[92%] mx-auto my-[4%]  py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                            <div className="w-[92%] mx-auto text-[20px] mb-4 font-bold">事業者情報</div>
                            <div className="w-[92%] grid grid-cols-1 md:grid-cols-2 gap-x-8 mx-auto">

                                <div className=" py-4 border-b border-gay-200">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">事業形態</div>
                                        <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                            <div className="text-[14px]">
                                                {profile.user_type == '2' ? '法人' : '個人事業主'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" py-4 border-b border-gay-200">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">事業者名・屋号</div>
                                        <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                            <div className="text-[14px]">
                                                {profile.business_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" py-4 border-b border-gay-200">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">事業者名・屋号ガナ</div>
                                        <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                            <div className="text-[14px]">
                                                {profile.business_kana}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" py-4 border-b border-gay-200">
                                    <div className="text-[14px]">住所</div>
                                    <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                        <div className="text-[14px]">
                                            {profile.business_pref} {profile.business_city} {profile.business_area} {profile.business_street} {profile.business_building}
                                        </div>
                                    </div>
                                </div>

                                <div className=" py-4 border-b border-gay-200">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">電話番号</div>
                                        <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                            <div className="text-[14px]">
                                                {profile.business_phone_number}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" py-4 border-b border-gay-200">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-[14px]">インボイス番号</div>
                                        <div className="relative text-[14px] grow max-w-[400px]  flex items-center justify-end gap-6">
                                            <div className="text-[14px]">
                                                {profile.invoice_number}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className=" w-[92%] mx-auto bg-white border border-gray-200 shadow-md rounded-lg px-[4%] py-[3%] mb-6">
                    <Link className='flex items-center justify-end text-right text-[12px] gap-2 mb-4'>
                        <span>{ dayjs(now).format('YYYY/MM/DD HH:mm')} 現在</span>
                        <ReloadIcon className="w-3 h-3" />
                    </Link>

                    <div className="flex items-end leading-none mb-6">
                        <div className="font-semibold text-[20px] mr-8">取引情報</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <div className="h-28 relative flex items-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="ml-4">
                                <div className="text-[14px] mb-1">残高</div>
                                <div className="text-[30px] font-semibold">¥{ formatNumber(profile.amount) }</div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="h-28 relative flex items-center pl-6 bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="flex flex-col">
                                    <div className="text-[12px] mb-1">今月の売上</div>
                                    <div className="text-[24px] font-semibold">¥{formatNumber(profile.month_amount)}</div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                            <div className="h-28 relative flex items-center pl-6 bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                                <div className="flex flex-col">
                                    <div className="text-[12px] mb-1 flex items-center leading-none gap-2">
                                        <span className="text-red-500">2024/12/31 有効期限 </span>

                                    </div>
                                    <div className="text-[24px] font-semibold">¥35,000</div>
                                </div>
                                <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* <div className="h-28 relative flex items-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="ml-4">
                                <div className="text-[12px] mb-1">総保有ポイント</div>
                                <div className="text-[24px] font-semibold">500 pt</div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </div>
                        <div className="h-28 relative flex items-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="ml-4">
                                <div className="text-[12px] mb-1 flex items-center space-x-2">
                                    <div className="w-4 h-4 rounded-full bg-[#f5db06] flex items-center justify-center leading-none text-[12px]">C</div>
                                    <div>総保有コイン</div>
                                    <div className="group relative flex justify-center">
                                        <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center leading-none text-[12px]">?</div>
                                        <div className="absolute z-20 -right-56 top-8 w-[320px] px-4 py-3 scale-0 transition-all rounded-sm bg-[#3370ff] text-xs text-white group-hover:scale-100 font-semibold ">
                                            <span className="w-[16px] left-[78px] h-[10px] border border-t-0 border-b-[10px] border-b-[#3370ff] border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent absolute -top-[10px]"></span>
                                            サイト内商品購入や寄付に使用することができます。
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[24px] font-semibold">1,000 coins</div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </div> */}

                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-end leading-none mb-2">
                            <div className="font-semibold text-[20px] mr-8">紹介した案件</div>
                            <div className="font-semibold text-[28px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(profile.transaction_total_count) }</div>
                            <div className="font-semibold text-[14px]">件</div>
                        </div>

                        <Link href={`${route('admin.transactions')}?user=${user.id}`} className="flex gap-1 items-center">
                            <ArrowRight className="size-4"></ArrowRight>
                            <div className="text-[12px]">取引履歴を見る</div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                        <Link href={`${route('admin.transactions')}?user=${user.id}&status=0`} className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="flex flex-col items-center">
                                <div className="text-[14px] font-semibold mb-2">フォーム送信</div>
                                <div className="flex items-end leading-none">
                                    <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(profile.transaction_requested_count) }</div>
                                    <div className="font-semibold text-[12px]">件</div>
                                </div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </Link>
                        <Link href={`${route('admin.transactions')}?user=${user.id}&status=1`} className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="flex flex-col items-center">
                                <div className="text-[14px] font-semibold mb-2">商談中</div>
                                <div className="flex items-end leading-none">
                                    <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(profile.transaction_responding_count) }</div>
                                    <div className="font-semibold text-[12px]">件</div>
                                </div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </Link>
                        <Link href={`${route('admin.transactions')}?user=${user.id}&status=2`} className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="flex flex-col items-center">
                                <div className="text-[14px] font-semibold mb-2">成立</div>
                                <div className="flex items-end leading-none">
                                    <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(profile.transaction_accepted_count) }</div>
                                    <div className="font-semibold text-[12px]">件</div>
                                </div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </Link>
                        <Link href={`${route('admin.transactions')}?user=${user.id}&status=3`} className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="flex flex-col items-center">
                                <div className="text-[14px] font-semibold mb-2">不成立</div>
                                <div className="flex items-end leading-none">
                                    <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(profile.transaction_rejected_count) }</div>
                                    <div className="font-semibold text-[12px]">件</div>
                                </div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </Link>
                        <Link href={`${route('admin.transactions')}?user=${user.id}&status=6`} className="h-28 relative flex items-center justify-center bg-white border border-gray-200 shadow-md rounded-lg p-[4%]">
                            <div className="flex flex-col items-center">
                                <div className="text-[14px] font-semibold mb-2">完了</div>
                                <div className="flex items-end leading-none">
                                    <div className="font-semibold text-[24px] text-[#3370ff] -mb-1 mr-1">{ formatNumber(profile.transaction_complete_count) }</div>
                                    <div className="font-semibold text-[12px]">件</div>
                                </div>
                            </div>
                            <ArrowRight className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </Link>
                    </div>
                </div>
                
                <div className="flex gap-8 w-full justify-center">
                    <Link
                        href={route('admin.users.edit', [user.id])}
                        className="justify-center font-semibold w-[200px] text-xs h-[50px] flex items-center ms-4 bg-[#3370ff] hover:opacity-80 focus:opacity-80 text-white rounded-full"
                    >
                        編集する
                    </Link>
                    <PrimaryButton
                        onClick={toggleModal}
                        className="text-center h-[50px] w-[200px] bg-red-500 hover:opacity-80 focus:opacity-80"
                    >
                        削除する
                    </PrimaryButton>
                </div>
            </div>

            <DeleteModal isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteUser} />
        </AdminAuthLayout>
    );
}
