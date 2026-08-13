import React, { useState, useRef } from 'react';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import CheckIcon from '@/Components/Icons/CheckIcon';
import ArrowUnder from '@/Components/Icons/ArrowUnder';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ArrowLeft from '@/Components/Icons/ArrowLeft';

export default function FilterSideBar({
    className,
}) {
    let baseUrl = `${location.origin}${location.pathname}`;
    if (location.pathname == '/') {
        baseUrl = `${location.origin}/search`;
    } else {
        baseUrl = baseUrl.includes('/history') ? `${location.origin}/search` : baseUrl;
    }
    const { url } = usePage(); // Get the current URL
    const { search_options } = usePage().props;
    const params = new URLSearchParams(location.search);
    const percent = params.get('percent');
    const filter = params.get('filter');
    const sort = params.get('sort');
    const page = params.get('page');
    const keyword = params.get('keyword');

    const searchParams = new URLSearchParams(url.split("?")[1]); // Extract query string
  
    const parseCategoryArray = () => {
      const categoryArray = [];
      searchParams.forEach((value, key) => {
        if (key.startsWith("category[")) {
          categoryArray.push(value);
        }
      });
      return categoryArray;
    };

    const category = parseCategoryArray()

    const parseAreaArray = () => {
      const areaArray = [];
      searchParams.forEach((value, key) => {
        if (key.startsWith("area[")) {
            areaArray.push(value);
        }
      });
      return areaArray;
    };

    const areas = parseAreaArray()

    // category
    const [isCategoryNavOpen, setIsCategoryNavOpen] = useState(category.length > 0 ? true : false);
    const [categoryIds, setCategoryIds] = useState(category);

    const toggleCategoryNav = () => {
        setIsCategoryNavOpen(!isCategoryNavOpen);
    }
    const selectCategory = (value) => {
        let updatedCategoryIds = [...categoryIds];
        if (updatedCategoryIds.includes(String(value))) {
            updatedCategoryIds = updatedCategoryIds.filter(id => id != value);
        } else {
            updatedCategoryIds.push(value);
        }
        setCategoryIds(updatedCategoryIds);
        fetch({ category: updatedCategoryIds });
    }
    const menuRef = useRef(null);

    // エリア
    const [areaFilterStatus, setAreaFilterStatus] = useState(areas);
    const [isAreaNavOpen, setIsAreaNavOpen] = useState(areas.length > 0 ? true : false);
    const toggleAreaNav = () => {
        setIsAreaNavOpen(!isAreaNavOpen);
    }
    const selectArea = (value) => {
        let areaArray = [...areaFilterStatus];
        if (areaArray.includes(value)) {
            // 値が存在する場合は削除
            areaArray = areaArray.filter((item) => item !== value);
        } else {
            // 値が存在しない場合は追加
            areaArray.push(value);
        }
        setAreaFilterStatus(areaArray);
        fetch({ area: areaArray });
    }

    // Transaction Period
    const [isPeriodNavOpen, setIsPeriodNavOpen] = useState(false);
    const [periodFilterStatus, setPeriodFilterStatus] = useState(0);
    const togglePeriodNav = () => {
        setIsPeriodNavOpen(!isPeriodNavOpen);
    }
    const selectPeriod = (value) => {
        setPeriodFilterStatus(value);
    }

    // logout
    const { post } = useForm();
    const logout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    // sidebar
    const [isClosed, setIsClosed] = useState(false);
    const toggleSidebar = () => {
        setIsClosed(!isClosed);
    };

    const fetch = (changeParams) => {
        const params = {
            category: category,
            area: areas,
            percent: percent,
            keyword: keyword,
            sort: sort,
            filter: filter,
            page: page ?? 1,
            ...changeParams
        }
        router.get(baseUrl, params);
    }

    return (
        <div className={`bg-white hidden md:flex ${className || ''}`}>
            {/* Sidebar */}
            <div
                className={`${
                    isClosed ? 'w-0 opacity-0 p-0' : 'w-[280px] pl-6 pr-6'
                } pt-6 transition-all duration-150 ease-in-out overflow-hidden`}
                aria-hidden={isClosed}
            >
                <div className="mb-10">
                    <div className="flex items-center justify-between text-[14px] pb-2 border-b border-gray-200 font-semibold">
                        <span>絞り込み</span>
                        <Link href={baseUrl} className="text-[#3370ff] text-[12px]">クリア</Link>
                    </div>
                    <div className="flex flex-col text-[13px]">
                        <div className="relative py-4 border-b border-gray-200" >
                            <div onClick={toggleCategoryNav} className="flex items-center justify-between cursor-pointer">
                                <span>カテゴリーから探す</span>
                                <ArrowUnder className={"size-5 transform transition-all duration-200 " + (isCategoryNavOpen ? 'rotate-180' : '')}></ArrowUnder>
                            </div>
                            <ul
                                ref={menuRef}
                                className={`text-[13px] rounded-lg transition-all duration-200
                                 ${isCategoryNavOpen ? 'opacity-100 ' : ' overflow-hidden h-0'}`}
                            >
                                {search_options?.categories.map((item, index) => (
                                    <li onClick={() => {selectCategory(item.id)}} key={"category_filter_" + item.id}>
                                        <button className={'flex items-center justify-start w-full py-2 text-left hover:bg-gray-100 ' + (index == 0 ? 'mt-2' : '')}>
                                            { categoryIds.includes(String(item.id)) ? <CheckIcon className="w-[30px]" /> : <span className="w-[30px]"></span> }
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative py-4 border-b border-gray-200" >
                            <div onClick={toggleAreaNav} className="flex items-center justify-between cursor-pointer">
                                <span>対応エリア</span>
                                <ArrowUnder className={"size-5 transform transition-all duration-200 " + (isAreaNavOpen ? 'rotate-180' : '')}></ArrowUnder>
                            </div>
                            <div
                                className={`text-[14px] rounded-lg transition-all duration-200
                                ${isAreaNavOpen ? 'opacity-100 ' : ' overflow-hidden h-0'}`}
                            >
                                {search_options?.areas.map((item, index) => (
                                    <div key={"area_class_" + item.class + "_" + index} className={"py-2 " + (index == 0 ? ' mt-2' : '')}>
                                        { index >= 2 ? (<div className="font-semibold text-[9px] mb-1">{item.label}</div>) : ''}
                                        <div className="flex flex-wrap gap-1 text-[10px]">
                                            {item?.areas.map((area, i) => (
                                                <button
                                                    key={"area_" + area.name}
                                                    onClick={() => { selectArea(area.name) }}
                                                    className={
                                                        'font-normal flex items-center justify-start leading-none px-2 py-1 rounded-full text-left hover:bg-gray-100 border ' +
                                                        (areaFilterStatus.includes(area.name) ? 'border-[#224aa9] text-[#224aa9] bg-[#d1dcf4]' : 'border-gray-500')
                                                    }
                                                >
                                                    {area.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <div className="relative py-4 border-b border-gray-200" >
                            <div onClick={togglePeriodNav} className="flex items-center justify-between cursor-pointer">
                                <span>取引期間</span>
                                <ArrowUnder className={"size-5 transform transition-all duration-200 " + (isPeriodNavOpen ? 'rotate-180' : '')}></ArrowUnder>
                            </div>
                            <ul
                                ref={menuRef}
                                className={`text-[13px] rounded-lg transition-all duration-200
                                ${isPeriodNavOpen ? 'opacity-100 ' : ' overflow-hidden h-0'}`}
                            >
                                {search_options?.transaction_periods.map((item, index) => (
                                    <li onClick={() => {selectPeriod(item.value)}} key={"period_filter_" + item.value}>
                                        <button className={'flex items-center justify-start w-full py-2 text-left hover:bg-gray-100 ' + (index == 0 ? 'mt-2' : '')}>
                                            { periodFilterStatus == item.value ? <CheckIcon className="w-[30px]" /> : <span className="w-[30px]"></span> }
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                        <Link href={route('companies')} className={(url.includes('/search/companies') ? 'bg-gray-100 ' : ' ') + " relative py-4 border-b border-gray-200"} >
                            <div className={(url.includes('/search/companies') ? 'ml-3 ' : ' ') + " flex items-center justify-between cursor-pointer"}>
                                <span>企業から探す</span>
                            </div>
                        </Link>
                        <Link className="relative py-4 border-b border-gray-200" >
                            <div className="flex items-center justify-between cursor-pointer">
                                <span>支援になる商材</span>
                            </div>
                        </Link>
                        <Link href={route('history')} className={`${url.includes('/search/history') ? 'bg-gray-100 ' : ' '} relative py-4 border-b border-gray-200`} >
                            <div className={`${url.includes('/search/history') ? 'ml-3 ' : ' '} flex items-center justify-between cursor-pointer`}>
                                <span>閲覧履歴</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <div className="relative">
                <button
                    onClick={toggleSidebar}
                    className="fixed top-[45vh] -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                    role="button"
                    aria-expanded={!isClosed}
                    aria-label={isClosed ? 'Open Sidebar' : 'Close Sidebar'}
                >
                    {isClosed ? (<ArrowRight className="size-4" />) : (<ArrowLeft className="size-4" />)}
                </button>
            </div>
        </div>
    );
}
