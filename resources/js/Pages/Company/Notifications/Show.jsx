import "primereact/resources/themes/lara-light-cyan/theme.css";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import BackButton from "@/Components/BackButton";
import { Link } from "@inertiajs/react";

export default function Show({ notification }) {
    return (
        <CompanyAuthLayout>
            {notification && (
                <>
                    <CompanyTitle>お知らせん詳細</CompanyTitle>
                    <div className="mt-4 rounded-lg bg-white px-16 py-12 relative">
                        <div className="flex items-center justify-between ">
                            <h3 className="text-[20px] font-semibold">
                                {notification.data.title}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between mt-8 ">
                            {notification.data.content}
                        </div>

                        <div className="flex jsutify-content mt-16">
                            <Link href={route('company.notifications.index')} className="text-primary py-2 font-semibold hover:text-blue-300">一覧へ戻る</Link>
                        </div>
                    </div>
                </>
            )}
        </CompanyAuthLayout>
    );
}
