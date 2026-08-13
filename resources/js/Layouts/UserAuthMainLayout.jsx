import { Link, usePage } from '@inertiajs/react';
import UserAuthHeader from '@/Layouts/UserAuthHeader';
import FilterSideBar from '@/Layouts/FilterSideBar';
import NavBar from '@/Layouts/NavBar';
import SpNavBar from '@/Layouts/SpNavBar';
import MainSideBar from '@/Layouts/MainSideBar';
import { MainLayout } from './MainLayout';

export default function UserAuthMainLayout({ children }) {
    const { url } = usePage(); // Get the current URL
    const isSearch = url.includes('search');
    const isHistory = url.includes('transactions');
    const isMypage = url.includes('mypage');;
    const isHome = url === "/";

    return (
        <MainLayout>
            <div className="md:min-w-[1200px] bg-[#f3f4f6] z-10">
                <UserAuthHeader 
                    isHome={isHome} 
                    isSearch={isSearch} 
                    isHistory={isHistory} 
                    isMypage={isMypage} 
                />
                <div className="flex min-h-screen flex-col">
                    <div className="flex md:mx-0">
                        <NavBar
                            isHome={isHome} 
                            isSearch={isSearch} 
                            isHistory={isHistory} 
                            isMypage={isMypage}  
                        />
                        <SpNavBar
                            isHome={isHome} 
                            isSearch={isSearch} 
                            isHistory={isHistory} 
                            isMypage={isMypage}  
                        />
                        { ( isSearch || isHome ) ? <FilterSideBar /> : <MainSideBar /> }
                        <div 
                            className="wrapper grow"
                            style={{ backgroundImage: ( isSearch || isHome ) ? "" : `url('/assets/images/back1.png')`, backgroundSize: "100%", backgroundRepeat: "repeat-y" }}
                            >
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
