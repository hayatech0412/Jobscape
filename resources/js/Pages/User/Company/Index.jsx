import React, { useState } from 'react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';
import FilterButton from '@/Components/FilterButton';
import ProductSortButton from '@/Components/ProductSortButton';
import RewardFilterButton from '@/Components/RewardFilterButton';
import CompanyProfile from '@/Components/Users/CompanyProfile';
import FilesIcon from '@/Components/Icons/FilesIcon';
import { Link, usePage, router } from '@inertiajs/react';
import AngleIcon from '@/Components/Icons/AngleIcon';
import Pagination from '@/Components/Pagination';
import ProductList from '@/Components/ProductList';

export default function Index({
    companies,
    products_sort_types,
    products_filter_types,
}) {
    const baseUrl = `${location.origin}${location.pathname}`;
    const { url } = usePage(); // Get the current URL
    const params = new URLSearchParams(location.search);
    const searchParams = new URLSearchParams(url.split("?")[1]); // Extract query string
    const category = params.get('category');
    for (const [key, value] of params.entries()) {
        console.log(`${key}: ${value}`);
    }
    const filter = params.get('filter');
    const sort = params.get('sort');
    const page = params.get('page');
    const area = params.get('area');


    const parseCategoryArray = () => {
        const categoryArray = [];
        searchParams.forEach((value, key) => {
          if (key.startsWith("category[")) {
            categoryArray.push(value);
          }
        });
        return categoryArray;
    };

    const [categoryIds, setCategoryIds] = useState(parseCategoryArray());
    
    const fetch = (changeParams) => {
        const params = {
            category: category,
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
  
    const { search_options } = usePage().props;

    return (
        <UserAuthMainLayout>
            <div className="grow pt-12 mb-32 min-h-screen">
                <div className="ml-[4%] w-[92%] ">

                    <div className="w-full bg-white md:border border-gray-200 shadow-md font-semibold rounded-lg py-[36px] mb-6 ">
                        <div className="w-[92%] ml-[4%] md:w-[94%] md:mx-auto">
                            <div className="font-semibold text-[24px] md:text-[20px] mb-6">企業から探す</div>

                            <div className="flex flex-wrap items-start justify-start gap-2">
                                {search_options.categories.map((item, index) => (
                                    <button
                                        onClick={() => searchWithCategory(item.id)}
                                        key={"category" + index}
                                        className={
                                            'leading-none text-[12px] rounded-full px-[20px] py-[10px] border ' +
                                            (categoryIds.includes(String(item.id)) ? 'bg-[#d8e3fa] text-[#3370ff] border-[#3370ff]' : 'border-gray-200')
                                        }
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[92vw] flex justify-end items-center mb-3">
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
                    <div className="rounded-lg bg-white shadow-md p-4 md:p-8 mb-8">
                        <h2 className='text-[20px] font-bold mb-6'>検索結果</h2>
                        {
                            companies.data.length > 0 ? (
                                companies.data.map((company, index) => (
                                    <div key={company.id} className={` bg-white rounded-lg px-4 md:px-8 py-12 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] mb-12 `}>
                                        <CompanyProfile company={company} />
                                        <div className='bg-gray-100 py-8 px-8 mb-8'>
                                            <div className="text-[12px] mb-8">{company.summary}</div>
                                            <h3 className='flex items-center text-lg font-bold'>
                                                <FilesIcon className='mr-3' size={7} color='#6792fa' />
                                                会社概要
                                            </h3>
                                            <div className='text-[12px] mt-4 list-disc list-inside'>
                                                {company.overview}
                                            </div>
                                        </div>
                                        <div className='mt-4'>
                                            <div className='flex items-center justify-between'>
                                                <h3 className='text-lg font-bold mb-4'>取り扱い商材</h3>
                                                <Link href='#' className='flex items-center text-sm'><AngleIcon size={4} className="rotate-90" />もっと見る</Link>
                                            </div>
                                            <ProductList id={company.id} type="company" products={company.products} />
                                        </div>
                                    </div>
                                ) )

                            ) : (
                                <div className="text-[16px] mb-12 text-center">検索結果がありません。</div>
                            )
                        }
                        { companies.links.last_page > 1 && <Pagination page={companies.links.current_page} last_page={companies.links.last_page} setPage={page => fetch({ page: page })} /> }
                    </div>
                </div>
            </div>
        </UserAuthMainLayout>
    );
}
