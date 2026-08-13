import { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import Pagination from "@/Components/Companies/Pagination";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import ProductsTable from "@/Pages/Company/Products/ProductsTable";
import axios from "axios";

export default function Products() {
    const { products, status_current, keyword, headers, status_list } =
        usePage().props;

    const [data, setData] = useState({});
    const [statusSearch, setStatusSearch] = useState(0);
    const [keywordSearch, setKeywordSearch] = useState("");

    useEffect(() => {
        if (products) {
            setData(products);
            setStatusSearch(status_current);
            setKeywordSearch(keyword);
        }
    }, [products]);

    const handleChangeStatus = (e) => {
        setStatusSearch(e.target.value);
        fetch({ status: e.target.value });
    };

    const handleChangeKey = (e) => {
        axios
            .get(
                route("company.products.search.keyword", {
                    page: data.current_page,
                    status: status_current,
                    keyword: e.target.value,
                })
            )
            .then((response) => {
                const responseData = response.data;
                setData(responseData.products);
                setStatusSearch(responseData.status_current);
                setKeywordSearch(responseData.keyword);
            });
    };

    const fetch = (params) => {
        const newParams = {
            page: data.current_page,
            status: params.status,
            keyword: params.keyword,
            ...params,
        };
        router.get(route("company.products.search", newParams));
    };

    return (
        <CompanyAuthLayout>
            <div className="mt-4">
                <CompanyTitle>出品した商材</CompanyTitle>
            </div>

            {data.data && (
                <>
                    <div className="flex mt-6 flex-wrap">
                        <div>
                            <div className="mb-2">
                                <label htmlFor="product_status">
                                    ステータス
                                </label>
                            </div>
                            {status_list && (
                                <select
                                    className="border text-black w-full md:w-[240px] rounded-md border-gray-300"
                                    name="product_status"
                                    id="product_status"
                                    value={statusSearch ?? 0}
                                    onChange={handleChangeStatus}
                                >
                                    <option value="0">全て</option>
                                    {status_list.map((status, index) => (
                                        <option
                                            key={index}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div>
                            <div className="mb-2">
                                <label
                                    htmlFor="product_status"
                                    className="ml-0 md:ml-2"
                                >
                                    フリワード
                                </label>
                            </div>
                            <input
                                className="mt-4 md:mt-0 ml-0 md:ml-2 border text-black w-full md:w-[240px] rounded-md border-gray-300"
                                name="keyword"
                                id="keyword"
                                onChange={handleChangeKey}
                                value={keywordSearch}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center justify-start">
                            <span className="text-sm text-gray-500">
                                表示件数
                            </span>
                            <span className="text-xl mx-2 font-bold text-black">
                                {data.from}-{data.to}
                            </span>
                            <span className="text-sm text-gray-500">
                                / {data.total}
                            </span>
                        </div>
                    </div>

                    {data.data.length > 0 && (
                        <ProductsTable headers={headers} values={data.data} />
                    )}

                    <ul className="md:mt-8 mt-2">
                        {data.data.length === 0 && (
                            <li className="mt-8 text-[16px] text-center">
                                現在表示する商材がありません。
                            </li>
                        )}
                    </ul>

                    <div className="mb-8">
                        {data.data.length > 0 && (
                            <Pagination
                                page={data.current_page}
                                last_page={data.last_page}
                                setPage={(page) => fetch({ page: page })}
                            />
                        )}
                    </div>
                </>
            )}
        </CompanyAuthLayout>
    );
}
