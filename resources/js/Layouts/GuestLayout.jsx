import GuestHeader from './GuestHeader';
import { MainLayout } from './MainLayout';

export default function GuestLayout({ children }) {
    return (
        <MainLayout>
            <div className="">
                <GuestHeader></GuestHeader>
                <div className="flex min-h-screen flex-col bg-gray-100 sm:pt-0">
                    {children}
                </div>
            </div>
        </MainLayout>
    );
}
