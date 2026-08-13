import React, { useState } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import ProductSortButton from '@/Components/ProductSortButton';
import FilterButton from '@/Components/FilterButton';
import RewardFilterButton from '@/Components/RewardFilterButton';
import ProductCard from '@/Components/Users/ProductCard';
import { Link, usePage, router } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";

export default function Items({
    products,
    selected_category,
    reward_filter_type,
    products_sort_types,
    products_filter_types,
    area,
    category,
    percent,
    sort,
    filter,
}) {
    const { props } = usePage();
    const baseUrl = `${location.origin}${location.pathname}`;

    const [categoryIds, setCategoryIds] = useState(category ?? [])
    const [areas, setAreas] = useState(area ?? [])

    const fetch = (changeParams) => {
        const params = {
            category: category,
            area: area,
            percent: percent,
            sort: sort,
            filter: filter,
            page: 1,
            ...changeParams
        }
        router.get(baseUrl, params);
    }

    const searchWithCategory = (value) => {
        let updatedCategoryIds = [...categoryIds];
        if (updatedCategoryIds.includes(String(value))) {
            updatedCategoryIds = updatedCategoryIds.filter(id => id != value);
        } else {
            updatedCategoryIds.push(value);
        }
        setCategoryIds(updatedCategoryIds);
        fetch({ category: updatedCategoryIds });
    }

    const searchWithArea = (value) => {
        let areaArray = [...areas];
        if (areaArray.includes(value)) {
            areaArray = areaArray.filter(item => item != value);
        } else {
            areaArray.push(value);
        }
        setAreas(areaArray);
        fetch({ area: areaArray });
    }

    return (
        <UserAuthMainLayout>
            <div className="grow pt-6 md:pt-12 mb-32 min-h-[100vh]">
                <div className="ml-[4vw] w-[92vw] md:ml-[4%] md:w-[92%]">
                    <div className="w-full bg-white md:border border-gray-200 shadow-md font-semibold rounded-lg py-[20px] md:py-[36px] mb-6 ">
                        <div className="w-[92%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="flex flex-wrap items-start justify-start gap-2">
                                {props.search_options.categories.map((item, index) => (
                                    <button
                                        onClick={() => searchWithCategory(item.id)}
                                        key={"category" + index}
                                        className={
                                            'leading-none text-[12px] rounded-full px-[10px] py-[5px] md:px-[20px] md:py-[10px]  border ' +
                                            (category?.includes(String(item?.id)) ? 'bg-[#d8e3fa] text-[#3370ff] border-[#3370ff]' : 'border-gray-200')
                                        }
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden w-full bg-white md:border border-gray-200 shadow-md font-semibold rounded-lg py-[20px] md:py-[36px] mb-6 ">
                        <div className="w-[92%] max-w-[92%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="w-[100%] overflow-auto">
                                <div className="grid grid-flow-col grid-rows-2 gap-2">
                                    {props.search_options.prefs.map((item, index) => (
                                        <button
                                            onClick={() => searchWithArea(item)}
                                            key={"area" + index}
                                            className={
                                                'leading-none w-[70px] text-[12px] rounded-full px-[10px] py-[5px] md:px-[20px] md:py-[10px] border ' +
                                                (area?.includes(item) ? 'bg-[#d8e3fa] text-[#3370ff] border-[#3370ff]' : 'border-gray-200')
                                            }
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[92vw] flex justify-between items-end">
                        <RewardFilterButton
                            current={percent}
                            reward_filter_type={reward_filter_type}
                            onSelect={(percent) => {fetch({ percent: percent })}}
                        />

                        <div className="text-[12px] flex items-center gap-2">
                            <ProductSortButton
                                onChange={(value) => { fetch({ sort: value }) }}
                                options={products_sort_types}
                                defaultValue={sort} />
                            <FilterButton
                                onChange={(value) => { fetch({ filter: value }) }}
                                options={products_filter_types}
                                defaultValue={filter} />
                        </div>
                    </div>

                    <div className={`mt-3 bg-white rounded-lg px-4 md:px-8 pb-8 md:pb-20 mb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]`}>
                        <h2 className='text-[20px] font-bold mt-4 mb-6'>検索結果</h2>

                        <div className='grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4'>
                            {products.data.map((product, index) => (
                                <ProductCard key={"product" + index} product={product} />
                            ))}
                        </div>
                        {
                            products.data.length == 0 ? (
                                <div className="text-[16px] text-center">検索結果がありません。</div>
                            ) : (<></>)
                        }
                        { products.last_page > 1 && <Pagination page={products.current_page} last_page={products.last_page} setPage={page => fetch({ page: page })} /> }
                    </div>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
