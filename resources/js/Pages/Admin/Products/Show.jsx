import React, { useState, useEffect } from 'react';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import DeleteModal from '@/Components/Admin/DeleteModal';
import BlockModal from '@/Components/Admin/BlockModal';
import AcceptModal from '@/Components/Admin/AcceptModal';
import StoreIcon from '@/Components/Icons/StoreIcon';
import ClockIcon from '@/Components/Icons/ClockIcon';
import CloseIcon from '@/Components/Icons/CloseIcon';
import ImageIcon from '@/Components/Icons/ImageIcon';
import ChatIcon from '@/Components/Icons/ChatIcon';
import Faqitem from '@/Components/Users/FaqItem';
import CompanyProfile from '@/Components/Users/CompanyProfile';
import BackButton from '@/Components/BackButton';
import FilesIcon from '@/Components/Icons/FilesIcon';
import ProductCard from '@/Components/Users/ProductCard';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { getTextFromOptions } from '@/Plugins/helper'
import ProductImages from '@/Components/ProductImages';

export default function Show({
    target_types,
    product,
 }) {
    const { auth } = usePage().props;
    const [rewardAmount, setRewardAmount] = useState(product.reward_amount);

    const { data, setData, get, processing, errors, reset } = useForm({
    });

    const introduce = (e) => {
        e.preventDefault();

        get(route('transaction.introduction', [product.id]));
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    useEffect(() => {   
        setRewardAmount(product.reward_amount);
    }, [product]);

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const toggleModal = (product) => {
        setIsOpenDeleteModal(prevState => !prevState);
    };
    
    const [isOpenBlockModal, setIsOpenBlockModal] = useState(false);
    const [isBlockSelected, setIsBlockSelected] = useState(null);
    const toggleBlockModal = (product) => {
        setIsOpenBlockModal(prevState => !prevState);
    }

    const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const toggleAcceptModal = (type) => {
        setIsOpenAcceptModal(prevState => !prevState);
        setSelectedType(type);
    }

    const actionForm = useForm();
    
    const deleteProduct = () => {
        actionForm.post(route('admin.products.delete', [product.id]), {
            onFinish: () => {
                setIsOpenDeleteModal(false);
            },
        });
    }
    
    const blockProduct = () => {
        actionForm.post(route('admin.products.block', [product.id]), {
            onFinish: () => {
                setIsOpenBlockModal(false);
            },
        });
    }

    const acceptProduct = () => {
        actionForm.post(route('admin.products.accept', [product.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }

    const rejectProduct = () => {
        actionForm.post(route('admin.products.reject', [product.id]), {
            onFinish: () => {
                setIsOpenAcceptModal(false);
            },
        });
    }

    return (
        <AdminAuthLayout> 
            <div className="w-[92%] max-w-[1200px] mx-auto bg-white shadow-lg rounded-lg py-10 mt-8 mb-32">
                <div className="w-[92%] mx-auto ">
                    <h2 className='text-2xl font-bold '>{product.name}</h2>
                    <div className="flex flex-wrap justify-between gap-4">
                        <div className='flex items-center justify-start mt-4 space-x-3'>
                            <p className='text-[14px] flex items-center mr-4'>{product.company.nickname}</p>
                            <p className='text-xs'><span>実績</span><span className='text-lg font-bold inline-block mx-2'>{product.company.performance_count}</span><span>件</span></p>
                            <div className='bg-gray-200 text-xs py-1 px-2'>初心者向け</div>
                            <div className='bg-gray-200 text-xs py-1 px-2'>大量募集</div>
                            <div className='bg-red-500 text-white text-xs py-1 px-2'>急募</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={route('admin.products.edit', [product.id])} className="bg-cyan-500 h-10 rounded-full w-[150px] flex justify-center items-center text-white text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                                編集する
                            </Link>
                            {
                                (product.status == 2) &&
                                <div className="flex items-center gap-4">
                                    <button onClick={() => {toggleAcceptModal('許可')}} className="bg-[#3370ff] h-10 rounded-full w-[150px] flex justify-center items-center text-white text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                                        許可する
                                    </button>
                                    <button onClick={() => {toggleAcceptModal('不許')}} className="bg-red-500 h-10 rounded-full w-[150px] flex justify-center items-center text-white text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                                        不許する
                                    </button>
                                </div>
                            }
                            {
                                (product.status == 5 || product.status == 3) &&
                                <button onClick={toggleBlockModal} className="bg-[#3370ff] h-10 rounded-full w-[150px] flex justify-center items-center text-white text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                                    {product.status == 5 ? 'ブロック解除' : 'ブロック'}する
                                </button>
                            }
                            {
                                (product.status != 1 && product.status != 2) &&
                                <button onClick={toggleModal} className="bg-red-500 h-10 rounded-full w-[150px] flex justify-center items-center text-white text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                                    削除する
                                </button>
                            }
                        </div>
                    </div>
                    <div className=''>
                        <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 flex mt-4'>
                            <div className='w-1/2'>
                                <ProductImages product={product} />
                            </div>
                            <div className='w-1/2 pl-8'>
                                <p className="whitespace-pre-line text-[14px]">
                                    {product.overview}
                                </p>
                                <div className='flex items-center gap-4 mt-8'>
                                    <div className='bg-gray-100 inline-flex text-[12px] items-center justify-start py-1 px-3'>
                                        <ClockIcon className="mr-2 text-[24px]" size={6} color="#697ff7" />
                                        掲載期間終了まで
                                        <span className='text-blue-500'>あと</span>
                                        <span className='text-blue-500 text-[15px] font-bold'>{product.left_date}</span>
                                        <span className='text-blue-500'>日</span>
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
                                <div className='flex items-end text-[12px] leading-none mt-2'>
                                    <span className=''>{product.reward_type == 1 ? '基本紹介料' : '基本紹介料利率' }</span>
                                    <span className='px-2 font-bold text-[30px] -mb-[3px]'>
                                        {product.reward_type == 1 ? '¥' : '' }
                                        <span className="">{formatNumber(rewardAmount)}</span>
                                        {product.reward_type == 2 ? '%' : '' }
                                    </span>
                                    <span className=''>(税込)</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-[22px] font-medium mt-12'>商材紹介</h3>
                            <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-8 mt-4'>
                                <div className='mx-auto w-[92%]'>
                                    { product.introduction1.image_path && <img src={product.introduction1.image_path} alt="" />}
                                    <p className='my-4'>
                                        {product.introduction1.detail_overview}
                                    </p>
                                    { product.introduction2.image_path && <img src={product.introduction2.image_path} alt="" />}
                                    <p className='my-4'>
                                        {product.introduction2.detail_overview}
                                    </p>
                                    { product.youtube_url && <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                        <iframe
                                        className="w-full h-full"
                                        src={product.youtube_url}
                                        title="YouTube video player"
                                        frameBorder={0}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        ></iframe>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-[22px] font-medium mt-12'>提供について</h3>
                            <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4'>
                                <dl className='flex items-start gap-2'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        サービス対象者
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        {getTextFromOptions(product.target_type, target_types)}
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        対応地域
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        <div className='flex items-center flex-wrap gap-x-2 gap-y-2'>
                                            {product.response_prefs.map((pref, index) => (
                                                <span key={index} className='rounded-full border border-gray-200 py-1 px-4 text-sm'>{pref}</span>
                                            ))}
                                        </div>
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        特典
                                    </dt>
                                    <dd className='flex-1 py-1 whitespace-pre-line'>
                                        { product.benefits }
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        条件
                                    </dt>
                                    <dd className='flex-1 py-1 whitespace-pre-line'>
                                        { product.condition }
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px] text-[12px]'>
                                        当社からのアプローチ
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        {product.approach}
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        当社免許・資格証明
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        { product.capacity_license }
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        出品ID
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        {product.product_code}
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        掲載日・更新日
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        {product.publish_at_label}
                                    </dd>
                                </dl>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-[22px] font-medium mt-12'>導入実績</h3>
                            <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 flex mt-4 text-[12px]'>
                                <ul className='w-full grid grid-cols-3 gap-4 list-disc list-inside'>
                                    {product.deploies.map((deploy, index) => (
                                        <li key={index} className=''>
                                            {deploy.deploy_name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-[22px] font-medium mt-12'>紹介会員 募集要項</h3>
                            <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4'>
                                <dl className='flex items-start gap-2'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        募集期間
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        {product.recurit_period}
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        募集件数
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        { product.apply_count }
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        対象紹介会員
                                    </dt>
                                    <dd className='flex-1 py-1'>
                                        {getTextFromOptions(product.introduction_type, target_types)}
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        条件
                                    </dt>
                                    <dd className='flex-1 py-1 whitespace-pre-line'>
                                        {product.introduction_condition}
                                    </dd>
                                </dl>
                                <dl className='flex items-start gap-2 mt-8'>
                                    <dt className='bg-gray-100 inline-flex items-center justify-center py-1 px-3 mr-4 w-[160px]'>
                                        紹介者へお願い
                                    </dt>
                                    <dd className='flex-1 py-1 whitespace-pre-line'>
                                        {product.introduction_memo}
                                    </dd>
                                </dl>

                            </div>
                        </div>

                        <div>
                            <h3 className='text-[22px] font-medium mt-12'>紹介スケジュール</h3>
                            <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4'>
                                <div className="relative">
                                    {product.schedules.map((faq, index) => (
                                        <dl key={index} className='flex items-center justify-between px-8 py-4 mb-6 border border-gray-200 rounded-full bg-white relative z-10'>
                                            <dt>
                                                {faq.title}
                                            </dt>
                                            <dd>
                                                {faq.from}~{faq.to}
                                            </dd>
                                        </dl>
                                    ))}
                                    <div className='h-full absolute z-0 w-[4px] bg-blue-500 left-[60px] top-0'>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-[22px] font-medium mt-12'>よくある質問</h3>
                            <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4'>
                                {product.faqs.map((faq, index) => (
                                    <Faqitem key={index} className="mb-4" title={faq.question} description={faq.answer} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className='text-[22px] font-medium mt-12'>提供企業情報</h3>
                            <div className='bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8 py-8 mt-4'>

                                <CompanyProfile company={product.company}/>
                                <div className='bg-gray-100 py-8 px-8'>
                                    <h3 className='flex items-center text-base font-bold'>
                                        <FilesIcon className='mr-2' size={6} color='#6792fa' />
                                        会社概要
                                    </h3>
                                    <ul className='mt-4 list-disc list-inside'>
                                        <li>
                                            {product.company.summary}
                                        </li>
                                        <li>
                                            {product.company.overview}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>                        
                    </div>

                </div>
            </div>

            <AcceptModal type={selectedType} isOpen={isOpenAcceptModal} onClose={toggleAcceptModal} onSubmit={selectedType == '許可' ? acceptProduct : rejectProduct} />
            <DeleteModal isOpen={isOpenDeleteModal} onClose={toggleModal} onSubmit={deleteProduct} />
            <BlockModal isOpen={isOpenBlockModal} product={product} onClose={toggleBlockModal} onSubmit={blockProduct} />
        </AdminAuthLayout>
    );
}
