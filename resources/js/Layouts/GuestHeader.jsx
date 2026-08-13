import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestHeader() {
    return (
        <div className="flex items-center px-[4%] lg:px-8 h-16">
            <div className="bg-white">
                <div className="flex items-center justify-between w-full">
                    <Link href="/logout" method='POST'>
                        <ApplicationLogo className="w-auto" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
