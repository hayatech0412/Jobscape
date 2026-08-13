import { useForm, usePage } from "@inertiajs/react";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import NotificationsTable from "@/Components/NotificationsTable";
import Pagination from "@/Components/Pagination";

export default function Notifications() {
    const { pageData, headers } = usePage().props;

    return (
        <UserAuthLayout>
            <div className="w-[92%] mx-auto max-w-[1024px] mt-4">
                <CompanyTitle>お知らせ一覧</CompanyTitle>
                <div className="mt-4">
                    {pageData.meta && (
                        <div className="relative">
                            <div className="absolute top-1 left-0 text-gray-500">
                                表示案件{" "}
                                <span className="text-base text-slate-700">
                                    {pageData.meta.from}-{pageData.meta.to}
                                </span>{" "}
                                / {pageData.meta.total}
                            </div>

                            <div className="">
                                <Pagination
                                    meta={pageData.meta}
                                    links={pageData.links}
                                />
                            </div>
                        </div>
                    )}

                    <NotificationsTable headers={headers ?? []} data={pageData} />
                </div>
            </div>
        </UserAuthLayout>
    );
}
