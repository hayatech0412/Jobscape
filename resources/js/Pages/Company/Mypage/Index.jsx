import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import { Link } from "@inertiajs/react";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import MypageCard from "@/Components/Companies/MypageCard";
import Card from "@/Components/Card";
import LinkIcon from "@/Components/Icons/LinkIcon";
import RefreshIcon from "@/Components/Icons/RefreshIcon";
import ProductItem from "@/Components/Companies/ProductItem";
import SliderNextIcon from "@/Components/Icons/SliderNextIcon";
import SliderPrevIcon from "@/Components/Icons/SliderPrevIcon";
import PlusIcon from "@/Components/Icons/PlusIcon";
import { Inertia } from "@inertiajs/inertia";
import ProductCard from "@/Components/Users/ProductCard";
import { formatNumber } from "@/Plugins/helper";
import dayjs from "dayjs";

export default function Mypage({user, products}) {
    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString("sv-SE", { timeZone: "Asia/Tokyo", hour12: false }).replace("T", " ").slice(0, -3));

    const reloadPage = () => {
        Inertia.reload({ only: ["user"] });
    }

    const settings = {
        dots: false,
        infinite: false,
        swipeToSlide: true,
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    const formatDate = (dateString) => {
        if (dateString) {
            return dayjs(dateString).format("YYYY/MM/DD");
        } else {
            return '';
        }
    }

    return (
        <CompanyAuthLayout>
            <div className="px-4 my-[32px]">

                <div className="mt-8 flex justify-end">
                    <Link
                        onClick={reloadPage}
                        className="w-fit flex justify-end items-center hover:opacity-50"
                    >
                        {currentDateTime} 現在
                        <RefreshIcon
                            width="16px"
                            height="16px"
                            color="#333333"
                            className="ml-2"
                        />
                    </Link>
                </div>
                <CompanyTitle><strong className="text-3xl mr-2">JOBSCAPE</strong><span className="text-xl font-normal">へ出品しよう</span></CompanyTitle>
                <div className="mt-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                        <Link href="./">
                            <div className="px-4 py-4 relative">
                                <p className="text-[18px]">総売上</p>
                                <p className="mt-2 text-2xl font-bold">
                                    ￥<span className="text-4xl">{formatNumber(user?.company?.total_sales)}</span>
                                </p>
                                <LinkIcon
                                    width={6}
                                    heigh={6}
                                    className="text-gray-500 absolute right-1 top-9"
                                />
                            </div>
                        </Link>

                        <Link href="./">
                            <Card isLink={true} color='bg-gradient-to-r from-[#344ef0] to-[#2db6f6]'>
                                <div className="px-4 py-8 relative">
                                    <p className="text-left text-white text-xs">
                                        今月の売上
                                    </p>
                                    <p className="text-left text-white text-lg font-semibold">
                                        ￥<span className="text-2xl">{formatNumber(user?.company?.month_sales)}</span>
                                    </p>
                                    <Link 
                                        href={route('company.orders.index')} 
                                        className="block w-6 h-6 rounded-full text-center text-[12px] font-semibold text-blue-500 absolute right-0 top-9 bg-[#2188fb]">
                                        <LinkIcon
                                            width={4}
                                            heigh={4}
                                            className="text-white absolute top-1 right-1"
                                        />
                                    </Link>
                                </div>
                            </Card>
                        </Link>
                        <Link href="./">
                            <Card isLink={true} color='bg-gradient-to-r from-[#4dcdf7] to-[#5eedee]'>
                                <div className="px-4 py-8 relative">
                                    <p className="text-left text-white text-xs">
                                        支払い期限 {formatDate(user?.company?.final_payment_deadline)}
                                    </p>
                                    <p className="text-left text-white text-lg font-semibold min-h-[32px]">
                                        { user?.company?.final_payment_deadline != '' && 
                                            <div className="text-2xl">
                                                ￥{formatNumber(user?.company?.final_payment_deadline_amount)}
                                            </div>
                                        }
                                    </p>
                                    <Link 
                                        href={route('company.orders.index')} 
                                        className="block w-6 h-6 rounded-full text-center text-[12px] font-semibold text-blue-500 absolute right-0 top-9 bg-[#50d5f5]">
                                        <LinkIcon
                                            width={4}
                                            heigh={4}
                                            className="text-white absolute top-1 right-1"
                                        />
                                    </Link>
                                </div>
                            </Card>
                        </Link>

                        <Card isLink={true} color='bg-transpanrent border-none shadow-none'>
                            <div className="px-2 relative">
                                <p className="text-center text-sm font-bold mb-2 py-1">
                                    審査登録をはじめる
                                </p>
                                <Link href="/company/products/create" >
                                    <div className="overflow-hidden rounded-md bg-white w-full px-4 py-4 border border-primary flex items-center justify-center font-bold shadow-[0_0_10px_0_rgba(0,0,0,0.1)] shadow-md">
                                        出品する
                                        <span className="block bg-white w-12 h-12 rounded-full text-center text-[12px] font-semibold bg-gradient-to-r from-[#344ef0] to-[#2db6f6] flex items-center justify-center ml-5">
                                            <PlusIcon
                                                size={4}
                                                color={'white'}
                                            />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="font-semibold vertical-end pl-3 text-base">
                        <span>紹介を受けた案件</span>
                        <span className="ml-2 text-primary text-3xl">
                            {user.total_orders_count}
                        </span>
                        <span className="ml-1">件</span>
                    </p>
                    <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-2">
                        <MypageCard
                            cardTitle="未対応"
                            cardValue={user.requested_orders_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="商談中"
                            cardValue={user.responding_orders_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="成立"
                            cardValue={user.accepted_orders_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="不成立"
                            cardValue={user.rejected_orders_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="売上報告中"
                            cardValue={user.reported_orders_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="入金確認中"
                            cardValue={user.payed_orders_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="完了"
                            cardValue={user.completed_orders_count}
                            url="/company/mypage/"
                        />
                    </div>
                </div>

                <div className="pt-12">
                    <p className="font-semibold vertical-end pl-3 text-base">
                    <span>出品審査中の商材</span>
                        <span className="ml-2 text-primary text-3xl">
                        {user.total_products_count}
                        </span>
                        <span className="ml-1">件</span>
                    </p>
                    <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-2">
                        <MypageCard
                            cardTitle="審査中"
                            cardValue={user.total_reviews_products_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="公開"
                            cardValue={user.total_public_products_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="出品停止中"
                            cardValue={user.total_stopped_products_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="出品不可"
                            cardValue={user.total_blocked_products_count}
                            url="/company/mypage/"
                        />
                        <MypageCard
                            cardTitle="削除"
                            cardValue={user.total_expired_products_count}
                            url="/company/mypage/"
                        />
                    </div>
                </div>

                <div className="mt-16">
                    <Card isLink={false}>
                        <div className="pl-4 pr-6 py-4">
                            <div className="pl-2 flex items-center justify-between">
                                <CompanyTitle>調査中の商材</CompanyTitle>
                                <Link
                                    href="/company/products"
                                    className="flex items-center justify-end ml-auto break-keep font-semibold"
                                >
                                    <LinkIcon width={4} height={4} />
                                    もっと見る
                                </Link>
                            </div>

                            <div className="mt-4 w-full relative">
                                <Slider
                                    ref={(slider) => {
                                        sliderRef = slider;
                                    }}
                                    {...settings}
                                >
                                    {
                                        products.map((product, index) => (
                                            <div
                                                key={1}
                                                className="px-2"
                                                style={{ width: "240px" }}
                                            >
                                                <ProductCard key={index} product={product} />
                                            </div>
                                        ))
                                    }
                                </Slider>

                                <SliderPrevIcon onClick={previous} className="absolute top-1/4 -translate-y-1/2 -left-1" />
                                <SliderNextIcon onClick={next} className="absolute top-1/4 -translate-y-1/2 -right-3"/>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="mt-12">
                    <CompanyTitle>お知らせ</CompanyTitle>
                    <ul className="mt-2 border border-l-0 border-r-0 border-b-0 border-gray-300">
                        <li>
                            <Link
                                href="./"
                                className="block py-4 border border-l-0 border-r-0 border-t-0 border-gray-300 hover:bg-blue-100"
                            >
                                キャンペーンがはじまりましたキャンペーンがはじまりました
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="./"
                                className="block py-4 border border-l-0 border-r-0 border-t-0 border-gray-300 hover:bg-blue-100"
                            >
                                キャンペーンがはじまりました
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="./"
                                className="block py-4 border border-l-0 border-r-0 border-t-0 border-gray-300 hover:bg-blue-100"
                            >
                                キャンペーンがはじまりましたキャンペーン
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="mt-12">
                    <CompanyTitle>お気軽にご相談ください</CompanyTitle>

                    <div className="grid grid-cols-3 gap-x-4">
                        <Link>
                            <Card isLink={true}>
                                <div className="px-4 py-8 font-semibold">
                                    メールで相談
                                </div>
                            </Card>
                        </Link>
                        <Link>
                            <Card isLink={true}>
                                <div className="px-4 py-8 font-semibold">
                                    メールで相談
                                </div>
                            </Card>
                        </Link>
                        <Link>
                            <Card isLink={true}>
                                <div className="px-4 py-8 font-semibold">
                                    メールで相談
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </CompanyAuthLayout>
    );
}
