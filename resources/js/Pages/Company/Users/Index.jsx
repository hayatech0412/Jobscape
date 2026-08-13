import CompanyTitle from "@/Components/Companies/CompanyTitle";
import DateRangePicker from "@/Components/DateRangePicker";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";

import CheckCircleIcon from "@/Components/Icons/CheckCircleIcon";
import WarningIcon from "@/Components/Icons/WarningIcon";
import Pagination from "@/Components/Companies/Pagination";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Users() {
    const {
        users,
        statusList,
        categories,
        paramCategory,
        paramStatus,
        paramStartDate,
        paramEndDate,
    } = usePage().props;

    const [pageData] = useState(users);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentStatus, setCurrentStatus] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPeriod, setCurrentPeriod] = useState("");

    useEffect(() => {
        setCurrentCategory(paramCategory ?? 0);
        setCurrentStatus(paramStatus ?? 0);
        if (!paramStartDate || !paramEndDate) {
            setCurrentPeriod("選択してください");
        } else {
            setCurrentPeriod(`${paramStartDate ?? ""} ~ ${paramEndDate ?? ""}`);
        }
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 1:
                return <span className="text-checkout">●</span>;
            case 2:
                return <CheckCircleIcon width="4" height="4" color="#6b7280" />;
            case 3:
                return (
                    <WarningIcon
                        size={14}
                        color="#b91c1c"
                        className="mr-4 fill-[#ef4444]"
                    />
                );
            default:
                break;
        }
        return "";
    };

    const handleGoDetail = (id) => {
        window.location.href = route("company.users.show", { user: id });
    };

    const handleChangeOption = (e) => {
        const { name, value } = e.target;

        if (name === "category") {
            setCurrentCategory(parseInt(value));
        } else if (name === "status") {
            setCurrentStatus(parseInt(value));
        }

        fetch({ [name]: value });
    };

    const handleChangeDate = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        fetch({ startDate: start, endDate: end });
    };

    const fetch = (params) => {
        const newParams = {
            page: pageData.current_page,
            status: currentStatus,
            category: currentCategory,
            startDate: params.orderDateStart,
            endDate: params.orderDateEnd,
            ...params,
        };
        router.get(route("company.users.index", newParams));
    };

    return (
        <CompanyAuthLayout>
            <div className="mt-4">
                <CompanyTitle>会員リスト</CompanyTitle>

                <div className="mt-4">
                    <div className="flex flex-wrap items-center justify-start gap-x-2">
                        <div className="lg:w-[60%] w-full">
                            <p className="font-semibold">範囲で絞り込み</p>
                            <div className="flex flex-wrap gap-x-2 mt-2">
                                <div className="flex-1">
                                    <select
                                        name="category"
                                        className="w-full text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 pl-4 pr-10 p-3"
                                        value={currentCategory}
                                        onChange={handleChangeOption}
                                    >
                                        <option value={0}>
                                            全てのサービスを表示
                                        </option>
                                        {categories &&
                                            categories.map((category) => {
                                                return (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <DateRangePicker
                                        startDate={startDate ?? ""}
                                        endDate={endDate ?? ""}
                                        currentPeriod={currentPeriod ?? ""}
                                        onChangeDate={handleChangeDate}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 lg:ml-16 md:ml-0 lg:mt-0 mt-4">
                            <p className="font-semibold">状況で絞り込み</p>
                            <div className="flex flex-wrap gap-x-2 mt-2">
                                <select
                                    name="status"
                                    className="flex-1 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 pl-4 pr-10 p-3"
                                    value={currentStatus}
                                    onChange={handleChangeOption}
                                >
                                    {statusList.map((status) => {
                                        return (
                                            <option
                                                key={status.key}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1 left-0 text-gray-500">
                            表示案件{" "}
                            <span className="text-base text-slate-700">
                                {pageData.from}-{pageData.to}
                            </span>{" "}
                            / {pageData.total}
                        </div>

                        <div className="">
                            <Pagination
                                page={pageData.current_page ?? 0}
                                last_page={pageData.last_page ?? 0}
                                setPage={(page) => fetch({ page: page })}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="mt-8 mb-8 w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-white border border-l-0 border-t-0 border-r-0">
                                    <th className="text-left py-4 px-4 w-[150px]">
                                        名前
                                    </th>
                                    <th className="text-left py-4 px-2 text-center">
                                        会社名
                                    </th>
                                    <th className="text-left py-4 px-2 text-center">
                                        対象商材
                                    </th>
                                    <th className="text-left py-4 px-2 w-[120px] text-center">
                                        活動状況
                                    </th>
                                    <th className="text-left py-4 px-2 text-center w-[200px]">
                                        最終発生日
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.data &&
                                    users.data.map((user, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="even:bg-blue-200 hover:bg-blue-100 bg-white hover:cursor-pointer"
                                                onClick={(e) =>
                                                    handleGoDetail(user.id)
                                                }
                                            >
                                                <td className="py-4 px-4">
                                                    <div className="flex items-start justify-start gap-2">
                                                        {user.profile && (
                                                            <>
                                                                <div>
                                                                    <p className="text-[12px]">
                                                                        {
                                                                            user
                                                                                .profile
                                                                                .first_kana
                                                                        }
                                                                    </p>
                                                                    <p className="font-semibold">
                                                                        {
                                                                            user
                                                                                .profile
                                                                                .first_name
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[12px]">
                                                                        {
                                                                            user
                                                                                .profile
                                                                                .last_kana
                                                                        }
                                                                    </p>
                                                                    <p className="font-semibold">
                                                                        {
                                                                            user
                                                                                .profile
                                                                                .last_name
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <p>
                                                        {
                                                            user.profile
                                                                .business_company_name
                                                        }
                                                    </p>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <p>
                                                        {user.profile.categories.map(
                                                            (category) => {
                                                                return (
                                                                    category.name +
                                                                    "・"
                                                                );
                                                            }
                                                        )}
                                                    </p>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <p className="flex items-center justify-start gap-1">
                                                        {getStatusIcon(
                                                            user.status
                                                        )}
                                                        {user.user_status}
                                                    </p>
                                                </td>
                                                <td className="py-4 px-2 text-center">
                                                    {user.last_transaction_date}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CompanyAuthLayout>
    );
}
