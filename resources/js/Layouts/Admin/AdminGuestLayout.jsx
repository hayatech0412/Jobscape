import { Link, useForm, usePage } from "@inertiajs/react";
import AdminGuestHeader from "./AdminGuestHeader";
import BackButtonIcon from "@/Components/Icons/BackButtonIcon";
import { MainLayout } from "../MainLayout";

export default function AdminGuestLayout({ children }) {
    const { back_url, regist_step } = usePage().props;
    const { post } = useForm();

    const handleLogoutSubmit = (e) => {
        e.preventDefault();
        post(route("company.logout"));
    };

    return (
        <MainLayout>
            <div className="bg-[#f5f5f5]">
                <AdminGuestHeader />

                <div className="mt-16 mx-auto lg:w-[1024px] w-[95%] min-h-[800px] ">
                    {children}
                </div>

            </div>
        </MainLayout>
    );
}
