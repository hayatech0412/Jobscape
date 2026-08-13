import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function CompanyGuestHeader() {
    return (
        <div className='w-full bg-white px-[32px] py-[20px]'>
            <Link href={route('company.login')} className='hover:opacity-50'>
                <ApplicationLogo className="w-auto" />
            </Link>
        </div>
    );
}
