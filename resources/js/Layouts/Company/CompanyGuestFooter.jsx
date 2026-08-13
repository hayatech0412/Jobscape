import { Link } from "@inertiajs/react";

export default function CompanyGuestFooter() {
    return (
        <div className="footer w-full py-[16px] px-[16px] bg-white mt-8">
            <div className="flex lg:flex-row flex-col items-center justify-center gap-4">
                <p className="lg:block hidden text-black-500 text-sm">
                    © JOBSCAPE, Inc.
                </p>
                <ul className="flex lg:flex-row flex-wrap items-center justify-center gap-2 text-black-700 text-[14px]">
                    <li className="font-semibold text-[14px]">
                        <Link href="">利用規約</Link>
                    </li>
                    {/* <li className="lg:block hidden">/</li> */}
                    <li>/</li>
                    <li className="font-semibold text-[14px]">
                        <Link href="./privacy">プライバシーポリシー</Link>
                    </li>
                    {/* <li className="lg:block hidden">/</li> */}
                    <li>/</li>
                    <li className="font-semibold text-[14px]">
                        <Link href="./help">ヘルプセンター</Link>
                    </li>
                    {/* <li className="lg:block hidden">/</li> */}
                    <li>/</li>
                    <li className="font-semibold text-[14px]">
                        <Link href="./contact">お問い合わせ</Link>
                    </li>
                </ul>

                <p className="lg:hidden block text-black-500 text-sm">
                    © JOBSCAPE, Inc.
                </p>
            </div>
        </div>
    );
}
