import CompanyGuestLayout from "@/Layouts/Company/CompanyGuestLayout";
import { Link } from "@inertiajs/react";

export default function Complete({ status, canResetPassword }) {
    return (
        <CompanyGuestLayout>
            <div className="bg-white lg:px-[100px] px-[20px] lg:py-[80px] py-[40px] shadow-md lg:w-[80%] mx-auto w-full">
                <div className="lg:w-[80%] w-full mx-auto">
                    <h2 className="lg:text-[24px] text-[22px] w-full text-center font-bold">
                        法人事業者審査へ提出しました
                    </h2>

                    <div className="w-[120px] mt-12 mx-auto">
                        <img
                            src="/assets/images/company_regist_complete.png"
                            alt="regist_complete"
                        />
                    </div>

                    <p className="mt-6 font-semibold">
                        審査結果は後日メールにてご連絡いたします。
                        <br />
                        審査結果によってはアカウントのご利用停止、またはご利用いただけない機能がございます。
                    </p>

                    <div className="mt-12 text-center">
                        <Link
                            href="/company/login"
                            className="block bg-primary hover:bg-primary-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 mx-auto rounded-full lg:w-[60%] w-[100%] mb-4"
                        >
                            マイページログイン
                        </Link>
                    </div>
                </div>
            </div>
        </CompanyGuestLayout>
    );
}
