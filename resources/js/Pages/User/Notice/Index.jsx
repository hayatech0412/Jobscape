import ArrowRight from "@/Components/Icons/ArrowRight";
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import UserAuthMainLayout from "@/Layouts/UserAuthMainLayout";
import { Link } from "@inertiajs/react";
import dayjs from 'dayjs';

export default function Index({notices}) {

    const formatDate = (dateString) => {
        return dayjs(dateString).format("YYYY/MM/DD");
    };
    return <UserAuthLayout>
                <div className="bg-white border border-gray-200 shadow-md rounded-lg py-4 mb-6">
                    <div className="w-[90%] max-w-[1000px] mx-auto py-8">
                        <div className="flex justify-between items-center mb-4 md:mb-6 md:pr-0">
                            <div className="font-semibold text-[18px] md:text-[20px]">お知らせ</div>
                        </div>
                        { notices.data.length > 0 ? (
                            notices.data.map((notice) => (
                                <div key={"notice" + notice.id} className="border-b border-gray-200 flex items-center h-12">
                                    <div className="text-[14px] text-gray-400 mr-[4%]">{ formatDate(notice.created_at)}</div>
                                    <p className="text-[14px] whitespace-pre-wrap">{ notice.content }</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-[16px] text-center">お知らせがありません。</div>
                        ) }
                    </div>
                </div>
            </UserAuthLayout>
}