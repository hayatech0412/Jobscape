import { useForm, usePage } from "@inertiajs/react";
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import { Link } from "@inertiajs/react";

export default function Show({ notification }) {
    return (
        <UserAuthLayout>
            {notification && (
                <div className="w-[92%] mx-auto max-w-[1024px] mt-4">
                    <CompanyTitle>お知らせ詳細</CompanyTitle>
                    <div className="mt-4 rounded-lg bg-white px-16 py-12 relative">
                        <div className="flex items-center justify-between ">
                            <h3 className="text-[20px] font-semibold">
                                {notification.data.title}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between mt-8 ">
                            <div dangerouslySetInnerHTML={{ __html: notification.data.content }} />
                        </div>

                        <div className="flex jsutify-content mt-16">
                            <Link href={route('notifications')} className="text-primary py-2 font-semibold hover:text-blue-300">一覧へ戻る</Link>
                        </div>
                    </div>
                </div>
            )}
        </UserAuthLayout>
    );
}
