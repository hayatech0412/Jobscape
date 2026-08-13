import AccountButton from "@/Components/AccountButton";
import ApplicationLogo from "@/Components/ApplicationLogo";
import BarIcon from "@/Components/Icons/BarIcon";
import NotificationButton from "@/Components/NotificationButton";
import { Link, usePage } from "@inertiajs/react";

export default function AdminAuthHeader() {
    const { auth, notify } = usePage().props;

    const toggleMenu = () => {
        document.getElementById("sidebar").classList.toggle("hidden");
    };

    return (
        <div className="w-full px-4 py-4 flex justify-between items-center border-b border-gray-200 md:justify-end">
            <button
                onClick={toggleMenu}
                className="flex items-center space-x-4 md:hidden"
            >
                <BarIcon />
            </button>
            <div className="w-[100px] bg-white px-4 py-4 md:py-0 md:hidden">
                <Link href={route("company.settings.account")}>
                    <ApplicationLogo className="w-auto" />
                </Link>
            </div>
            <div className="flex items-center space-x-4 mt-0">
                <AccountButton user={auth.user} />
                <NotificationButton notify={notify} />
            </div>
        </div>
    );
}
