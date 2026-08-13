import { usePage } from "@inertiajs/react";
import ComapanyAuthSidebar from "./ComapnyAuthSidebar";
import CompanyAuthHeader from "./CompanyAuthHeader";
import { MainLayout } from '../MainLayout';

export default function CompanyAuthLayout({ children }) {
    const { back_url } = usePage().props;
    return (
        <MainLayout>
            <div className="bg-[#f5f5f5] flex min-h-dvh">
                <ComapanyAuthSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <CompanyAuthHeader />
                    <div className="w-full md:px-[32px] px-4 md:py-[16px] py-2">
                        { children }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
