import { Link, useForm, usePage } from "@inertiajs/react";
import CompanyGuestHeader from "./CompanyGuestHeader";
import CompanyGuestFooter from "./CompanyGuestFooter";
import BackButtonIcon from "@/Components/Icons/BackButtonIcon";
import { MainLayout } from "../MainLayout";

export default function CompanyGuestLayout({ children }) {
    const { back_url, regist_step } = usePage().props;
    const { post } = useForm();

    const handleLogoutSubmit = (e) => {
        e.preventDefault();
        post(route("company.logout"));
    };

    return (
        <MainLayout>
            <div className="bg-[#f5f5f5]">
                <CompanyGuestHeader />

                <div className="w-full px-[32px] py-[16px]">
                    <form onSubmit={handleLogoutSubmit}>
                        {regist_step === 0 ? (
                            <button type="submit" className="hover:opacity-50">
                                <BackButtonIcon />
                            </button>
                        ) : (
                            <Link href={back_url} className="hover:opacity-50">
                                <BackButtonIcon />
                            </Link>
                        )}
                    </form>
                </div>

                <div className="mt-2 mx-auto lg:w-[1024px] w-[95%] min-h-[800px] ">
                    {children}
                </div>

                <CompanyGuestFooter />
            </div>
        </MainLayout>
    );
}
