
import React, { useState, useRef, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SearchInput from '@/Components/SearchInput';
import AlarmWithBadge from '@/Components/AlarmWithBadgeUser';
import { Link, useForm, usePage } from '@inertiajs/react';
import ArrowRight from '@/Components/Icons/ArrowRight';

export default function UserAuthHeader({ children }) {
    const { auth, notify } = usePage().props;
    const { data, setData, post, get, processing, errors, reset } = useForm({
    });

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const logout = () => {
        post(route('logout'));
    }

    return (
        <div className="px-[4%] md:pl-6 md:pr-[calc((4%-14px))] h-16 shadow-md bg-white relative z-10">
            <div className="flex items-center justify-between w-full h-full">
                <div className="flex items-center justify-between gap-2 w-[70%] md:w-[40%]">
                    <Link href="/">
                        <ApplicationLogo className="w-auto" />
                    </Link>
                    <SearchInput />                 
                </div>
                <div className="flex items-center justify-between space-x-4">                 
                    <div className='relative flex items-center cursor-pointer' onClick={toggleMenu}>
                        <img
                            src={auth.user.avatar_url}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <ul ref={menuRef} className={`z-10 absolute top-9 right-0 w-[280px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg  ${isOpen ? 'block' : 'hidden'}`}>
                            <li className="flex items-center gap-2 p-5 border-b border-gray-200 mb-2">
                                <Link href={route('mypage')}>
                                    <img
                                        src={auth.user.avatar_url}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full"
                                    />
                                </Link>
                                <div className="text-[14px] grow flex flex-col justify-center gap-1">
                                    <Link href={route('mypage')} className="text-[14px] flex items-center justify-between gap-2">
                                        <span className="line-clamp-1">{auth.user.profile?.nickname}</span>
                                        <ArrowRight className="size-4" />
                                    </Link>
                                    <Link  className="text-[12px] text-[#3370ff]">{auth.user.profile?.plan.name}</Link>
                                </div>
                            </li>
                            <li>
                                <Link href={route('mypage')} className='flex items-center justify-start py-3 p-5 text-left hover:bg-gray-100 w-full'>
                                    マイページ
                                </Link>
                            </li>
                            <li>
                                <Link href={route('transactions')} className='flex items-center justify-start py-3 p-5 text-left hover:bg-gray-100 w-full'>
                                    取引履歴
                                </Link>
                            </li>
                            <li>
                                <Link href={route('payments.plan')} className='flex items-center justify-start py-3 p-5 text-left hover:bg-gray-100 w-full'>
                                    プランとランクアップ
                                </Link>
                            </li>
                            <li>
                                <Link href={route('help')} className='flex items-center justify-start py-3 p-5 text-left hover:bg-gray-100 w-full'>
                                    ヘルプセンター
                                </Link>
                            </li>
                            <li className='mb-5'>
                                <button onClick={logout} className='flex items-center justify-start py-3 p-5 text-left hover:bg-gray-100 w-full'>
                                    ログアウト
                                </button>
                            </li>                            
                        </ul>
                    </div>
                    <AlarmWithBadge notify={notify} />       
                </div>
            </div>
        </div>
    );
}
