import React, { useState, useRef } from 'react';
import UserSearchIcon from '@/Components/Icons/UserSearchIcon';
import { router, usePage } from '@inertiajs/react';

const SearchInput = () => {
    let baseUrl = `${location.origin}${location.pathname}`;
    baseUrl = baseUrl.includes('/company') ? baseUrl : `${location.origin}/search`;
    const { url } = usePage(); // Get the current URL

    const params = new URLSearchParams(location.search);
    const percent = params.get('percent');
    const filter = params.get('filter');
    const sort = params.get('sort');
    const page = params.get('page');
    const [keyword, setKeyword] = useState(params.get('keyword') ?? '');

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

    const areas = parseAreaArray();

    
    const submit = (e) =>  {
        e.preventDefault();
        const formData = {
            category: category,
            area: areas,
            percent: percent,
            sort: sort,
            filter: filter,
            page: page ?? 1,
            keyword: keyword,
        }
        router.get(baseUrl, formData);
    }

    return (
        <form  onSubmit={submit} className="relative w-[250px]">
            <input
                type="text"
                value={keyword}
                placeholder="何をお探しですか？"
                className="w-full px-8 py-1 text-[14px] border border-gray-100 rounded-full focus:outline-none shadow-md"
                onChange={(e) => { setKeyword(e.target.value) }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <UserSearchIcon />
            </div>
        </form>
    );
};

export default SearchInput;
