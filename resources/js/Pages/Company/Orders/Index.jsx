import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import { usePage } from "@inertiajs/react";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import CustomTable from "@/Pages/Company/Orders/CustomTable";
import Pagination from "@/Components/Companies/Pagination";
import { Inertia } from '@inertiajs/inertia';
import { useState } from "react";

export default function Order({ 
    statuses, 
    filter_durations, 
    filter_types, 
    results, 
    headers, 
    query
}) {
    const handleSelectChange = (e) => {
        const { name, value } = e.target;

        // Combine the current filters with the changed one
        const updatedFilters = {
            ...query,
            [name]: value,
        };

        // Make an Inertia call with updated filters
        Inertia.get('/company/orders', updatedFilters, { preserveState: true, preserveScroll: true });
    };
    const filter_statuses = [
        {key: 9, value: 9, label: '全てのステータスを表示'},
        ...statuses
    ]
    
    return (
        <CompanyAuthLayout>
            <CompanyTitle>受注管理</CompanyTitle>
            <form className="flex mt-6 flex-wrap">
                <select onChange={handleSelectChange} className="border border-gray-400 text-black w-full md:w-[240px]" name="duration" id="" value={query.duration}>
                    {filter_durations.map((duration, index) => (
                        <option key={index} value={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
                <select onChange={handleSelectChange} className="mt-4 md:mt-0 ml-0 md:ml-2 border border-gray-400 text-black w-full md:w-[240px]" name="type" id="" value={query.type}>
                    {filter_types.map((type, index) => (
                        <option key={index} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
                <select onChange={handleSelectChange} className="mt-4 md:mt-0 ml-0 md:ml-2 border border-gray-400 text-black w-full md:w-[240px]" name="status" id="" value={query.status}>
                    {filter_statuses.map((status, index) => (
                        <option key={index} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </form>
            <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center justify-start">
                    <span className="text-sm text-gray-500">
                        表示件数
                    </span>
                    <span className="text-xl mx-2 font-bold text-black">
                        {(results.meta.per_page - 1) * results.meta.current_page + 1} - {results.meta.per_page * results.meta.current_page}
                    </span>
                    <span className="text-sm text-gray-500">
                        / {results.meta.total}
                    </span>
                </div>
                <div>
                    <button className="bg-primary text-white rounded-full px-5 py-3">
                        CSVダウンロード
                    </button>
                </div>
            </div>
            <CustomTable headers={headers} values={results.data} />
            <Pagination meta={results.meta} links={results.links} results={results} />
        </CompanyAuthLayout>
    );
}
