import { usePage } from "@inertiajs/react";
import AdminAuthSidebar from "./AdminAuthSidebar";
import AdminAuthHeader from "./AdminAuthHeader";
import { MainLayout } from '../MainLayout';

export default function AdminAuthLayout({ children }) {
    const { back_url } = usePage().props;
    return (
        <MainLayout>
            <div className="bg-[#f5f5f5] flex min-h-dvh">
                <AdminAuthSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <AdminAuthHeader />
                    
                    { children }
                </div>
            </div>
        </MainLayout>
    );
}
