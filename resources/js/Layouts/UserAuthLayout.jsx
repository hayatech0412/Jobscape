import { Link } from '@inertiajs/react';
import UserAuthHeader from './UserAuthHeader';
import BackButton from '@/Components/BackButton';
import { MainLayout } from './MainLayout';

export default function UserAuthLayout({ children }) {
    return (
        <MainLayout>
            <div className="bg-[#f3f4f6]">
                <UserAuthHeader></UserAuthHeader>

                <div className="flex min-h-screen flex-col sm:pt-0">
                    
                    {children}
                    
                </div>
            </div>
        </MainLayout>
    );
}
