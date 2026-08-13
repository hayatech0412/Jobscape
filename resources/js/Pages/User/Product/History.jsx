import React, { useState } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import ProductSortButton from '@/Components/ProductSortButton';
import FilterButton from '@/Components/FilterButton';
import RewardFilterButton from '@/Components/RewardFilterButton';
import ProductCard from '@/Components/Users/ProductCard';
import { Link, usePage, router } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";

export default function History({
    products,
}) {

    return (
        <UserAuthMainLayout>
            <div className="grow pt-6 md:pt-12 mb-32 min-h-[100vh]">
                <div className="ml-[4vw] w-[92vw] md:ml-[4%] md:w-[92%]">

                    <div className={`mt-3 bg-white rounded-lg px-4 md:px-8 pb-8 md:pb-20 mb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]`}>
                        <h2 className='text-[20px] font-bold mt-4 mb-6'>閲覧履歴</h2>

                        <div className='grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4'>
                            {products.data.map((product, index) => (
                                <ProductCard key={"product" + index} product={product} />
                            ))}
                        </div>
                        {
                            products.data.length == 0 ? (
                                <div className="text-[16px] text-center">閲覧履歴がありません。</div>
                            ) : ''
                        }
                        { products.last_page > 1 && <Pagination page={products.current_page} last_page={products.last_page} setPage={page => fetch({ page: page })} /> }
                    </div>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
