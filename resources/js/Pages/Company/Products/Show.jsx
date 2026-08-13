import React, { useState, useEffect } from "react";
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import StoreIcon from "@/Components/Icons/StoreIcon";
import ClockIcon from "@/Components/Icons/ClockIcon";
import CloseIcon from "@/Components/Icons/CloseIcon";
import ImageIcon from "@/Components/Icons/ImageIcon";
import Faqitem from "@/Components/Users/FaqItem";
import CompanyProfile from "@/Components/Users/CompanyProfile";
import FilesIcon from "@/Components/Icons/FilesIcon";
import ProductCard from "@/Components/Users/ProductCard";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { getTextFromOptions } from "@/Plugins/helper";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import ProductImages from "@/Components/ProductImages";

export default function Show({
    target_types,
    period_units,
    product,
    otherProducts,
}) {
    const { post } = useForm();
    const [rewardAmount, setRewardAmount] = useState(product.reward_amount);

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    useEffect(() => {
        setRewardAmount(product.reward_amount);
    }, [product]);

    const handlePublish = (e) => {
        e.preventDefault();

        post(route("company.products.publish", product.id));
    };

    return (
        <CompanyAuthLayout>
            <div className="grow py-8">
                <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
                <div className="flex items-center justify-start mt-4 space-x-3">
                    <p className="text-[14px] flex items-center mr-4">
                        {product.company.nickname}
                    </p>
                    <p className="text-xs">
                        <span>実績</span>
                        <span className="text-lg font-bold inline-block mx-2">
                            {product.deploies.length}
                        </span>
                        <span>件</span>
                    </p>
                    {/* <div className="bg-gray-200 text-xs py-1 px-2">
                        初心者向け
                    </div>
                    <div className="bg-gray-200 text-xs py-1 px-2">
                        大量募集
                    </div>
                    <div className="bg-red-500 text-white text-xs py-1 px-2">
                        急募
                    </div> */}
                </div>
                <div className="w-full ">
                    <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 flex mt-4">
                        <div className="w-1/2">
                            <ProductImages product={product} />
                            <div className="flex items-center gap-4">
                                <button className='border border-gray-200 rounded-full py-1 px-4 mt-4 flex items-center'>
                                    <ImageIcon className="text-[#3370ff] size-5 mr-2" />資料を一覧で見る
                                </button>
                            </div>
                        </div>
                        <div className="w-1/2 pl-8">
                            <p className="whitespace-pre-line text-[14px]">{product.overview}</p>
                            <div className="flex items-center gap-4 mt-8">
                                <div className="bg-gray-100 inline-flex text-[12px] items-center justify-start py-1 px-3">
                                    <ClockIcon
                                        className="mr-2 text-[24px]"
                                        size={6}
                                        color="#697ff7"
                                    />
                                    掲載期間終了まで
                                    <span className="text-blue-500">あと</span>
                                    <span className="text-blue-500 text-[15px] font-bold">
                                        {product.left_date}
                                    </span>
                                    <span className="text-blue-500">日</span>
                                </div>
                                <div className="flex items-center text-[12px] gap-2 leading-none">
                                    <span>残り </span>
                                    {typeof product.apply_remainder === 'string' ?
                                        <span className='text-[20px]'>{product.apply_remainder}</span> :
                                        <>
                                            <span className='text-[20px]'>{formatNumber(product.apply_remainder)}</span>
                                            <span> 枠</span>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="flex items-end text-[12px] leading-none mt-2">
                                <span className="">
                                    {product.reward_type == 1
                                        ? "基本紹介料"
                                        : "基本紹介料利率"}
                                </span>
                                <span className="px-2 font-bold text-[30px] -mb-[3px]">
                                    {product.reward_type == 1 ? "¥" : ""}
                                    <span className="">
                                        {formatNumber(rewardAmount)}
                                    </span>
                                    {product.reward_type == 2 ? "%" : ""}
                                </span>
                                <span className="">(税込)</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-12">商材紹介</h3>
                        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4">
                            <div className="mx-auto max-w-[600px]">
                                {product.introduction1?.image_path && (
                                    <img
                                        src={product.introduction1?.image_path}
                                        alt=""
                                    />
                                )}
                                <p className="my-4">
                                    {product.introduction1?.detail_overview}
                                </p>
                                {product.introduction2 &&
                                    product.introduction2?.image_path && (
                                        <img
                                            src={
                                                product.introduction2?.image_path
                                            }
                                            alt=""
                                        />
                                    )}
                                {product.introduction2 && (
                                    <p className="my-4">
                                        {product.introduction2.detail_overview}
                                    </p>
                                )}

                                {product.youtube_url && (
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                        <iframe
                                            className="w-full h-full"
                                            src={product.youtube_url}
                                            title="YouTube video player"
                                            frameBorder={0}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-12">導入実績</h3>
                        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 flex mt-4 text-[12px]">
                            <ul className="w-full grid grid-cols-3 gap-4 list-disc list-inside">
                                {product.deploies.map((deploy, index) => (
                                    <li key={index} className="">
                                        {deploy.deploy_name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-12">概要</h3>
                        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4">
                            <dl className="flex items-start">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    応募期間
                                </dt>
                                <dd className="flex-1 py-1">
                                    {product.recurit_period}
                                </dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    希望紹介先
                                </dt>
                                <dd className="flex-1 py-1">
                                    {getTextFromOptions(
                                        product.target_type,
                                        target_types
                                    )}
                                </dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    平均報酬額（100%）
                                </dt>
                                <dd className="flex-1 py-1">￥20,000</dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    平均取引期間
                                </dt>
                                <dd className="flex-1 py-1">
                                    {product.transaction_period}
                                    {product.transaction_period_unit}
                                </dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    紹介先条件
                                </dt>
                                <dd className="flex-1 py-1">
                                    {product.introduction_condition}
                                </dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    営業アプローチ
                                </dt>
                                <dd className="flex-1 py-1">
                                    {product.approach}
                                </dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    対応地域
                                </dt>
                                <dd className="flex-1 py-1">
                                    <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
                                        {product.response_prefs?.map(
                                            (pref, index) => (
                                                <span
                                                    key={index}
                                                    className="rounded-full border border-gray-200 py-1 px-4 text-sm"
                                                >
                                                    {pref}
                                                </span>
                                            )
                                        )}
                                        {product.overseas &&
                                            product.overseas?.map(
                                                (oversea, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full border border-gray-200 py-1 px-4 text-sm"
                                                    >
                                                        {oversea}
                                                    </span>
                                                )
                                            )}
                                    </div>
                                </dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    概要
                                </dt>
                                <dd className="flex-1 py-1">
                                    {product.overview}
                                </dd>
                            </dl>
                            <dl className="flex items-start mt-4">
                                <dt className="bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]">
                                    掲載日
                                </dt>
                                <dd className="flex-1 py-1">
                                    {product.publish_at_label}
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-12">
                            紹介スケジュール
                        </h3>
                        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4">
                            <div className="relative">
                                {product.schedules?.map((schedule, index) => (
                                    <dl
                                        key={index}
                                        className="flex items-center justify-between px-8 py-4 mb-6 border border-gray-200 rounded-full bg-white relative z-10"
                                    >
                                        <dt>{schedule.title}</dt>
                                        <dd>
                                            {schedule.start_amount}
                                            {schedule.start_unit}~
                                            {schedule.end_amount}
                                            {schedule.end_unit}
                                        </dd>
                                    </dl>
                                ))}
                                <div className="h-full absolute z-0 w-[4px] bg-blue-500 left-[60px] top-0"></div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-12">
                            よくある質問
                        </h3>
                        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4">
                            {product.faqs?.map((faq, index) => (
                                <Faqitem
                                    key={index}
                                    className="mb-4"
                                    title={faq.question}
                                    description={faq.answer}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mt-12">
                            提供企業情報
                        </h3>
                        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4">
                            <CompanyProfile company={product.company} />
                            <div className="bg-gray-100 py-8 px-8">
                                <h3 className="flex items-center text-base font-bold">
                                    <FilesIcon
                                        className="mr-2"
                                        size={6}
                                        color="#6792fa"
                                    />
                                    会社概要
                                </h3>
                                <ul className="mt-4 list-disc list-inside">
                                    <li>{product.company.summary}</li>
                                    <li>{product.company.overview}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-[400px] w-full my-12 mx-auto flex items-center justify-center gap-2">
                    {/* {product.status === 1 && (
                        <form onSubmit={handlePublish} className="flex-1">
                            <button
                                type="submit"
                                className="w-full bg-primary text-white rounded-full py-4 text-[16px] font-semibold text-center"
                            >
                                公開する
                            </button>
                        </form>
                    )} */}
                    <Link
                        href={route("company.products.edit", product.id)}
                        className="block bg-teal-700 text-white rounded-full py-4 flex-1 font-semibold text-[16px] text-center"
                    >
                        編集する
                    </Link>
                </div>
            </div>
        </CompanyAuthLayout>
    );
}
