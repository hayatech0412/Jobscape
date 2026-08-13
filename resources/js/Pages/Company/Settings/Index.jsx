import CompanyTitle from "@/Components/Companies/CompanyTitle";
import CameraIcon from "@/Components/Icons/CameraIcon";
import LinkIcon from "@/Components/Icons/LinkIcon";
import ShieldWithCheck from "@/Components/Icons/ShieldWithCheck";
import InputError from "@/Components/InputError";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Settings() {
    const { user } = usePage().props;
    const { data, setData, post, errors } = useForm({
        avatar: "",
        avatar_file: undefined,
        email: "",
        password: undefined,
        company: {
            summary: "",
            overview: "",
        },
    });

    const [userInfo, setUserInfo] = useState({});
    const [summaryLength, setSummaryLength] = useState(300);
    const [overviewLength, setOverviewLength] = useState(500);
    const [isEditEmail, setIsEditEmail] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const [newEmail, setNewEmail] = useState("");

    const imageRef = useRef();

    useEffect(() => {
        if (user) {
            setUserInfo(user);
        }
    }, [user]);

    const dataWatcher = useMemo(
        () => {
            setData({
                ...data,
                avatar: userInfo.avatar,
                email: userInfo.email,
                password: userInfo.password,
                company: {
                    summary: userInfo.company?.summary,
                    overview: userInfo.company?.overview,
                },
            });
        },
        [userInfo],
        true
    );

    const handleClickImageButton = () => {
        imageRef.current.click();
    };

    const handleChangeFile = (e) => {
        const { files } = e.target;
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setUserInfo({
                ...userInfo,
                avatar: file.name,
                avatar_url: e.target.result,
            });
            setData({
                ...data,
                avatar_file: file,
            });
        };

        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("user.")) {
            const realName = name.replace("user.", "");
            setUserInfo({ ...userInfo, [realName]: value });
        } else if (name.includes("company.")) {
            const realName = name.replace("company.", "");
            setUserInfo({
                ...userInfo,
                company: { ...userInfo.company, [realName]: value },
            });

            if (realName === "summary") {
                setSummaryLength(300 - value.length);
            } else if (realName === "overview") {
                setOverviewLength(500 - value.length);
            }
        }
    };

    const handleClickEdit = (e) => {
        const { name } = e.target;
        e.preventDefault();

        if (name === "email") {
            setIsEditEmail(!isEditEmail);
        } else if (name === "password") {
            setIsEditPassword(!isEditPassword);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        setIsEditEmail(false);
        setIsEditPassword(false);

        post(route("company.settings.update.account"));
    };

    const handleDelete = (e) => {
        e.preventDefault();

        setIsEditEmail(false);
        setIsEditPassword(false);

        post(route("company.settings.delete.account"));
    };

    return (
        <CompanyAuthLayout>
            {userInfo && userInfo.company && (
                <div className="px-16">
                    <form onSubmit={handleUpdate}>
                        <div className="mt-32 rounded-lg bg-white px-4 pt-16 pb-16 text-center relative">
                            <div className="absolute w-[120px] h-[120px]  left-1/2 -translate-x-1/2 -top-[80px]">
                                <div className="w-full h-full border-4 border-white bg-gray-100 object-contain overflow-hidden rounded-full">
                                    <img
                                        src={userInfo.avatar_url}
                                        alt="avatar"
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="absolute -bottom-1 right-4 w-[30px] h-[30px] rounded-full bg-white border border-gray-700 flex items-center justify-center">
                                    <CameraIcon />
                                </div>
                                <button
                                    type="button"
                                    className="absolute w-full h-full left-0 top-0 rounded-full hover:cursor-point hover:bg-white hover:opacity-50"
                                    name="avatar"
                                    onClick={handleClickImageButton}
                                ></button>
                                <input
                                    type="file"
                                    name="user.avatar"
                                    className="hidden"
                                    ref={imageRef}
                                    onChange={handleChangeFile}
                                />
                                {errors.avatar && (
                                    <InputError
                                        message={errors.avatar}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {errors.avatar_file && (
                                    <InputError
                                        message={errors.avatar_file}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                            <h2 className="text-gray-800 font-semibold text-center text-[20px]">
                                株式会社はやぶさ・ホールディングス
                            </h2>
                            <div className="md:mt-[30px] mt-4 mx-auto text-center text-[14px] flex items-center justify-center gap-2">
                                <ShieldWithCheck className={"w-5 h-6"} />{" "}
                                法人審査未
                            </div>

                            <div className="md:w-[230px] w-full mx-auto md:my-[28px] my-8 border-t-[1px] border-gray-300"></div>
                            <Link
                                href={route("company.settings.office")}
                                className="text-primary mx-auto text-[14px]"
                            >
                                事業者情報を確認する
                            </Link>
                        </div>

                        <div className="mt-16 rounded-lg bg-white p-20 relative">
                            <h3 className="text-[20px] font-semibold">
                                アカウント情報
                            </h3>

                            <div className="flex items-center justify-between mt-16">
                                <p className="text-[14px]">アカウント名</p>
                                <p className="text-[16px]">
                                    {userInfo.company.coporate_name}
                                </p>
                            </div>

                            <div className="border-t-[1px] my-8 w-full"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-4">
                                <p className="md:w-[300px] text-[14px] w-full">
                                    紹介文
                                </p>
                                <div className="flex-1">
                                    <div className="relative">
                                        <textarea
                                            name="company.summary"
                                            id="summary"
                                            rows="8"
                                            maxLength={300}
                                            className="appearance-none w-full resize-none p-4 pr-12 border border-gray-300 rounded-sm"
                                            value={
                                                userInfo.company.summary ?? ""
                                            }
                                            onChange={handleInputChange}
                                        />

                                        <span className="absolute bottom-2 right-2 text-[12px] text-gray-400">
                                            /{summaryLength}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t-[1px] my-8 w-full"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-4">
                                <p className="md:w-[300px] text-[14px] w-full">
                                    会社概要
                                </p>
                                <div className="flex-1">
                                    <div className="relative">
                                        <textarea
                                            name="company.overview"
                                            id="overview"
                                            rows={8}
                                            maxLength={500}
                                            className="appearance-none w-full resize-none p-4 pr-12 border border-gray-300 rounded-sm"
                                            value={
                                                userInfo.company.overview ?? ""
                                            }
                                            onChange={handleInputChange}
                                        />

                                        <span className="absolute bottom-2 right-2 text-[12px] text-gray-400">
                                            /{overviewLength}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t-[1px] my-8 w-full"></div>

                            <div className="flex md:flex-row flex-col items-start justify-between gap-4">
                                <p className="md:w-[300px] text-[14px] w-full">
                                    個人メールアドレス（非公開）
                                </p>
                                <div className="flex-1 flex items-center justify-start gap-8">
                                    {!isEditEmail && (
                                        <p className="ml-auto text-[14px]">
                                            {userInfo.email}
                                        </p>
                                    )}
                                    {isEditEmail && (
                                        <input
                                            type="email"
                                            name="user.email"
                                            className="appearance-none w-full border border-gray-300 rounded-sm text-[14px] text-right"
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        className="text-primary whitespace-nowrap text-[14px]"
                                        name="email"
                                        onClick={handleClickEdit}
                                    >
                                        {isEditEmail ? "キャンセル" : "編集"}
                                    </button>
                                </div>
                            </div>

                            <div className="border-t-[1px] my-8 w-full"></div>

                            <div className="flex md:flex-row flex-col items-center justify-between gap-4">
                                <p className="md:w-[300px] text-[14px] w-full">
                                    現在のパスワード（非公開）
                                </p>
                                <div className="flex-1 flex items-center justify-start gap-8">
                                    {!isEditPassword && (
                                        <p className="ml-auto text-[14px]">
                                            {Array(
                                                userInfo.password
                                                    ? userInfo.password.length
                                                    : 16
                                            ).fill("*")}
                                        </p>
                                    )}
                                    {isEditPassword && (
                                        <input
                                            type="password"
                                            name="user.password"
                                            className="appearance-none w-full border border-gray-300 rounded-sm text-[14px] text-right"
                                            value={userInfo.password ?? ""}
                                            onChange={handleInputChange}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        className="text-primary whitespace-nowrap text-[14px]"
                                        name="password"
                                        onClick={handleClickEdit}
                                    >
                                        {isEditPassword ? "キャンセル" : "編集"}
                                    </button>
                                </div>
                            </div>

                            <div className="border-t-[1px] my-8 w-full"></div>

                            <div className="flex md:flex-row flex-col items-center justify-between gap-4">
                                <p className="md:w-[300px] text-[14px] w-full">
                                    メールアドレスの追加
                                </p>
                                <div className="flex-1 flex items-center justify-start gap-8">
                                    <input
                                        type="email"
                                        name="newEmail"
                                        className="appearance-none w-full border border-gray-300 rounded-sm text-[14px] text-right"
                                        value={newEmail}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="border-t-[1px] my-8 w-full"></div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="mt-12 mx-auto md:w-[250px] w-full rounded-full bg-primary py-4 font-semibold text-white hover:bg-blue-300"
                                >
                                    保存する
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* <div className="mt-16 rounded-lg bg-white p-20 relative">
                        <h3 className="text-[20px] font-semibold">
                            重要な操作
                        </h3>

                        <div className="flex items-center justify-between mt-8 py-4 border-b-[1px] border-gray-300">
                            <div className="text-[14px] flex items-center justify-start gap-1 relative">
                                <span>アカウントを削除する</span>

                                <div className="group relative flex justify-center">
                                    <button
                                        type="button"
                                        className="border border-pink-dark w-[24px] h-[24px] flex items-center justify-center text-center text-pink-dark text-[16px] font-semibold rounded-full"
                                    >
                                        !
                                    </button>
                                    <div className="absolute top-9 scale-0 transition-all rounded-sm bg-pink-dark p-2 text-xs text-white group-hover:scale-100 font-semibold w-fit whitespace-nowrap">
                                        <span className="w-[16px] h-[10px] border border-t-0 border-b-[10px] border-b-pink-dark border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent absolute -top-[10px] left-1/2 -translate-x-1/2"></span>
                                        削除すると元に戻すことはできません。ご注意ください。
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleDelete}>
                                <button
                                    type="submit"
                                    className="text-primary text-[14px]"
                                >
                                    削除に進む
                                </button>
                            </form>
                        </div>

                        <div className="border-t-[1px] border-b-[1px] border-gray-300 mt-16">
                            <Link
                                href={route("company.settings.delete.account")}
                                className="flex items-center justify-between py-4 w-full"
                            >
                                <p className="text-[14px]">
                                    アカウントを削除したい
                                </p>
                                <LinkIcon
                                    width={6}
                                    height={6}
                                    className="text-primary"
                                />
                            </Link>
                        </div>
                    </div> */}
                </div>
            )}
        </CompanyAuthLayout>
    );
}
