import { Link, useForm, usePage } from "@inertiajs/react";
import HSTogglePassword from "@preline/toggle-password";
import AdminGuestLayout from "@/Layouts/Admin/AdminGuestLayout";
import InputError from "@/Components/InputError";

export default function Login({ status, canResetPassword }) {
    const { csrf_token, back_url } = usePage().props;

    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.login"));
    };
    return (
        <AdminGuestLayout>
            <div className="bg-white lg:px-[100px] px-[20px] lg:py-[80px] py-[40px] shadow-md lg:w-[80%] mx-auto w-full">
                <div className="md:w-[410px] w-full mx-auto">
                    <h2 className="lg:text-[24px] text-[22px] w-full text-center font-bold">
                        JOBSCAPE管理画面
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-16 mb-4">
                            <label
                                htmlFor="email"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                メールアドレス
                            </label>

                            <input
                                type="email"
                                name="email"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：jobscape@jobscape.co.jp"
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && (
                                <InputError
                                    message={errors.email}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="text-[12px] block text-gray-700 font-bold mb-1 "
                            >
                                パスワード
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    id="hs-toggle-password"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 pl-6 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    id="show-btn"
                                    data-hs-toggle-password='{"target": "#hs-toggle-password"}'
                                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 text-[10px] rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-600"
                                >
                                    表示
                                </button>
                            </div>
                            {errors.password && (
                                <InputError
                                    message={errors.password}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                type="submit"
                                className="block bg-primary hover:bg-primary-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 mx-auto rounded-full lg:w-[60%] w-[100%] mb-4"
                            >
                                ログイン
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminGuestLayout>
    );
}
