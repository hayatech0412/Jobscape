import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import ShieldWithCheck from '@/Components/Icons/ShieldWithCheck';
import ArrawRight from '@/Components/Icons/ArrowRight';
import CircleCheckBox from '@/Components/CircleCheckBox';
import InputLabel from '@/Components/InputLabel';
import ArrowRightTop from '@/Components/Icons/ArrowRightTop';
import UserAuthLayout from '@/Layouts/UserAuthLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import TransactionInfo from './TransactionInfo';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Index({
    product,
    plan,
    RewardTypes,
    company,
}) {
    const { flash } = usePage().props;
    const { data, setData, post, get, processing, errors, reset } = useForm({
        product_id: product.id,
        contact_type: flash.introduction_info?.contact_type ?? false,
        user_memo: flash.introduction_info?.user_memo ?? '',
        is_target_agree: flash.introduction_info?.is_target_agree ?? false,
        is_encrypt: flash.introduction_info?.is_encrypt ?? false,
        target_memo: flash.introduction_info?.target_memo ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('transaction.introduction.store'), {
            onFinish: () => reset('password'),
        });
    };

    const handleInput = (id, value) => {
        setData({...data,  [id]: value });
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    function formatDate(dateString) {
        return dayjs(dateString).format("YYYY年MM月DD日");
    }

    return (
        <UserAuthLayout>
            <div className="px-[4%] lg:px-8">
                <BackButton className="w-6 h-6 my-6"></BackButton>
            </div>

            <div className="w-[92%] max-w-[1200px] mx-auto">
                <div className="block md:flex md:space-x-8 w-full mx-auto mb-20 md:mb-20">
                    <TransactionInfo
                        product={product}
                        plan={plan}
                        RewardTypes={RewardTypes}
                        company={company}
                    />

                    <div className="grow">
                        <div className="text-[18px] mb-6">商材を知人に紹介する</div>

                        <div className="bg-white pt-[70px] pb-[100px] rounded-md mb-6 md:mb-0 shadow-md">
                            <div className="text-[12px] mb-12 text-center w-[92%] mx-auto">
                                次のページで「紹介を受ける方」の連絡先・情報を入力します。必ずご本人の同意を得てお進みください。
                            </div>

                            <div className="rounded-md max-w-[500px] w-[92%] mx-auto mb-6 ">
                                <div className="w-full max-w-[650px] mx-auto mb-6">
                                    <div
                                        className={
                                            "flex items-center justify-between border-2 rounded-md gap-3 md:gap-6 p-[4%] mb-8 "
                                            + (data.contact_type ? 'border-[#3370ff]' : '')
                                            + (errors.contact_type ? 'border-[#ea2d2d]' : '')
                                        }
                                    >
                                        <div className="flex items-center">
                                            <CircleCheckBox
                                                id="contact_type"
                                                checked={data.contact_type}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="grow">
                                            <div className="text-[14px] mb-4">商材提供企業から直接連絡します</div>
                                            <div className="text-[12px]">企業から「紹介を受ける方」へ直接連絡し、商品説明や購入手続きを行います。</div>
                                        </div>
                                        <div className="hidden md:block">
                                            <img src="/assets/images/intro1.png" alt="Phone" className="min-w-14 w-14 object-cover" />
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            "flex items-center justify-between border-2 rounded-md gap-3 md:gap-6 p-[4%] mb-8 "
                                            + (data.is_target_agree ? 'border-[#3370ff]' : '')
                                            + (errors.is_target_agree ? 'border-[#ea2d2d]' : '')
                                        }
                                    >
                                        <div className="flex items-center">
                                            <CircleCheckBox
                                                id="is_target_agree"
                                                checked={data.is_target_agree}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="grow">
                                            <div className="text-[14px] mb-4">「紹介を受ける方」の同意は得ていますか</div>
                                            <div className="text-[12px] mb-2">必修情報「紹介を受ける方」の以下の情報が必要です。</div>
                                            <div className="text-[12px] text-[#3370ff] leading-5">
                                                <span className="text-[16px]">・</span> 氏名<br />
                                                <span className="text-[16px]">・</span> メールアドレス<br />
                                                <span className="text-[16px]">・</span> 電話番号
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <img src="/assets/images/intro2.png" alt="Phone" className="min-w-14 w-14 object-cover" />
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            "flex items-center justify-between border-2 rounded-md gap-3 md:gap-6 p-[4%] mb-2 "
                                            + (data.is_encrypt ? 'border-[#3370ff]' : '')
                                            + (errors.is_encrypt ? 'border-[#ea2d2d]' : '')
                                        }
                                    >
                                        <div className="flex items-center">
                                            <CircleCheckBox
                                                id="is_encrypt"
                                                checked={data.is_encrypt}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="grow">
                                            <div className="text-[14px] mb-4">「紹介を受ける方」の個人情報は保存できません</div>
                                            <div className="text-[12px]">
                                                個人情報保護の観点から、次のページで入力した「紹介を受ける方」の個人情報はコード化され、JOBSCAPE内では再度確認することができなくなります。
                                            </div>
                                        </div>
                                        <div className="hidden md:block min-w-8 w-8" />
                                    </div>

                                    <div className="text-[12px] mb-12 leading-10">
                                        ※必要に応じて以下の自分用のメモ欄へ情報を記録していただくことができます。（任意）
                                        <Link className="flex text-[#3370ff] leading-none">「紹介を受ける方」の個人情報の取り扱いについて<ArrowRightTop className="size-3"></ArrowRightTop></Link>
                                    </div>

                                    <div className="mb-20">
                                        <InputLabel className="mb-2" type="任意" value="自分用メモ" />
                                        <textarea
                                            className="w-full p-4 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[12px]"
                                            rows="4"
                                            value={data.target_memo}
                                            onChange={(e) => handleInput('target_memo', e.target.value)}
                                            placeholder="例：
                                            ・紹介を受ける方の情報
                                            （名前・ニックネーム、社名・所属、関係性、紹介した場所、特記事項等）"
                                        />
                                        <InputError message={errors.nickname} className="mt-2" />
                                        <div className="mb-4 text-[12px]">※<span className="font-semibold">自分用メモ欄</span>に記載された情報はマイページより確認することができます。</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[92%] mx-auto max-w-[700px] border-b border-gray-200 mb-16"></div>

                            <div className="rounded-md max-w-[500px] w-[92%] mx-auto mb-6 ">
                                <div className="w-full max-w-[650px] mx-auto mb-6">

                                    <div className="text-[12px] mb-12">
                                        これより先にご入力いただいた情報は、選択商材の提供企業へメール送付されます。<br />
                                        フォームを送信されますと、情報の修正や、お取引キャンセルができませんので、<br />
                                        必ずすべての項目をご確認、ご同意いただいた上、送信してください。
                                    </div>


                                    <div className="mb-2">
                                        <InputLabel className="mb-3" type="任意" value="商材提供企業への取次メモ" />
                                        <div className="mb-4 text-[12px]">
                                            企業へはあなたのニックネーム、「紹介を受ける方」の基本連絡先のみ通知されます。
                                            その他に伝達死体情報をご記入ください。
                                        </div>
                                        <textarea
                                            className="w-full p-4 whitespace-pre-line border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[12px]"
                                            rows="4"
                                            value={data.user_memo}
                                            onChange={(e) => handleInput('user_memo', e.target.value)}
                                            placeholder="例：
                                            ・あなたの追加情報（氏名、社名・所属等）
                                            ・紹介を受ける方の情報（関係性、特記事項等）
                                            ・企業への挨拶・メッセージ"
                                        />
                                        <InputError message={errors.user_memo} className="mt-2" />
                                    </div>

                                    <div className="text-[11px] mb-16">
                                        ※注意：会員様から企業へ直接取り引きを促す行為は<Link className="text-[#3370ff]">利用規約</Link>で禁止されています。
                                    </div>

                                    <div className="text-center mt-10">
                                        <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                                            同意して進む
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </UserAuthLayout>
    );
}
