import SearchPageIcon from '@/Components/Icons/SearchPageIcon';
import HistoryIcon from '@/Components/Icons/HistoryIcon';
import HomeIcon from '@/Components/Icons/HomeIcon';
import MypageIcon from '@/Components/Icons/MypageIcon';
import { Link } from '@inertiajs/react';

export default function NavBar({ 
    className,
    isMypage,
    isHome,
    isSearch,
    isHistory,
}) {
    return (
        <div className="hidden md:block min-w-20 border-r bg-white border-gray-200 pt-6">
            <div className={className + " flex flex-col items-center gap-4 w-full h-full text-[10px]"}>
                <Link href={ route('home') } className={"flex flex-col items-center gap-1 " + (isHome ? 'text-[#3370ff]' : '')}>
                    <HomeIcon />
                    <div className="">ホーム</div>
                </Link>
                <Link href={ route('search') } className={"flex flex-col items-center gap-1 " + (isSearch ? 'text-[#3370ff]' : '')}>
                    <SearchPageIcon />
                    <div className="">さがす</div>
                </Link>
                <Link href={ route('transactions') } className={"flex flex-col items-center gap-1 " + (isHistory ? 'text-[#3370ff]' : '')}>
                    <HistoryIcon />
                    <div className="">取引管理</div>
                </Link>
                <Link href={ route('mypage') } className={"flex flex-col items-center gap-1 " + (isMypage ? 'text-[#3370ff]' : '')}>
                    <MypageIcon />
                    <div className="">マイページ</div>
                </Link>
            </div>
        </div>
    );
}
