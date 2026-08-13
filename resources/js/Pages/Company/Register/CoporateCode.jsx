import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import CheckIcon from "@/Components/Icons/CheckIcon";
import LinkArrow from "@/Components/Icons/LinkArrow";
import { Link, useForm, usePage } from "@inertiajs/react";
import CompanyGuestLayout from "@/Layouts/Company/CompanyGuestLayout";
import WarningIcon from "@/Components/Icons/WarningIcon";

export default function CoporateCode() {
    const { company } = usePage().props;
    const { setData, post, errors } = useForm({
        coporate_code: "",
    });

    const [companyData, setCompanyData] = useState(company ?? undefined);
    const [isCoporate, setIsCoporate] = useState(
        company && company.coporate_code ? company.coporate_code !== "" : false
    );
    const [coporateCode, setCoporateCode] = useState(
        company && company.coporate_code ? company.coporate_code : ""
    );
    const [canSend, setCanSend] = useState(
        company && company.coporate_code && company.coporate_code.length === 13
    );
    const [isReady, setIsReady] = useState(false);
    const [isInvalid, setIsInvalid] = useState(
        company && company.coporate_name && company.postal_code
    );
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isReady) {
            handleApiCall();
        }
    }, [isReady]);

    const dataWatcher = useMemo(() => {
        setData({ coporate_code: coporateCode });

        if (coporateCode.length < 13) {
            setCompanyData(undefined);
            setIsInvalid(false);
        }

        setIsReady(coporateCode.length === 13);
    }, [coporateCode]);

    const handleCheckboxChange = (e) => {
        setIsCoporate(e.target.checked);
        setCanSend(
            e.target.checked &&
                companyData &&
                companyData.coporate_code &&
                companyData.coporate_code !== "" &&
                companyData.coporate_code.length === 13 &&
                companyData.coporate_name &&
                companyData.postal_code
        );
    };

    const handleInputChange = (e) => {
        setCoporateCode(e.target.value);
        setIsReady(e.target.value.length === 13);
    };

    const handleApiCall = () => {
        setIsLoading(true);
        axios
            .get(
                route("company.register.coporate_code", {
                    coporate_code: coporateCode,
                })
            )
            .then((response) => {
                const responseData = response.data.company;
                const result =
                    responseData.coporate === null ||
                    (responseData.coporate &&
                        (!responseData.coporate.coporate_name ||
                            !responseData.coporate.postal_code));

                setIsInvalid(result);
                setCompanyData(responseData.coporate);
                setCanSend(!result && isCoporate);
            })
            .catch((error) => {
                setCanSend(false);
                setCompanyData(undefined);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isCoporate) {
            confirm("法人番号をチェックしてください");
        } else if (coporateCode === "") {
            confirm("法人番号を入力してください");
        } else {
            post(route("company.register.coporate_code"));
        }
    };

    return (
        <CompanyGuestLayout>
            <div className="bg-white lg:px-[60px] px-[20px] lg:py-[80px] py-[40px] shadow-md lg:w-[80%] mx-auto w-full">
                <div className="lg:w-[80%] w-full mx-auto">
                    <h2 className="lg:text-[24px] text-[22px] w-full text-left font-bold">
                        法人番号登録
                    </h2>

                    <p className="mt-4">
                        JOBSCAPEへの出品には事業者情報が必要です。入力した情報は審査、出品情報等に使用されます。法人番号を入力し、事業者情報を選択してください。
                    </p>

                    <Link
                        href="./"
                        className="flex items-center justify-start block text-primary mt-2 text-[12px]"
                    >
                        事業者情報の使用について
                        <LinkArrow className="text-primary -rotate-45" />
                    </Link>
                    <form onSubmit={handleSubmit}>
                        <label className="mt-6 flex flex-row items-center font-semibold w-fit">
                            <input
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                name="is_corporate"
                                onChange={handleCheckboxChange}
                                checked={isCoporate}
                            />
                            <span>法人</span>
                        </label>

                        <div className="mt-2">
                            <label
                                htmlFor="coporate_code"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                法人番号
                            </label>
                            <input
                                name="coporate_code"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                maxLength={13}
                                placeholder="例：1234567890123"
                                value={coporateCode ?? ""}
                                onChange={handleInputChange}
                            />
                            {errors.coporate_code && (
                                <div className="text-red-500 text-[12px] mt-2">
                                    {errors.coporate_code}
                                </div>
                            )}
                        </div>

                        <Link
                            href="./"
                            className="flex items-center justify-start text-primary mt-2 text-[12px]"
                        >
                            事業者情報の使用について
                            <LinkArrow className="text-primary -rotate-45" />
                        </Link>

                        <div className="mt-8 flex flex-row items-center justify-start border border-gray-300 bg-gray-100 px-[20px] py-[20px] rounded">
                            {companyData && !isInvalid && (
                                <>
                                    <CheckIcon className="mr-4 text-primary" />
                                    <div className="text-[12px]">
                                        <p className="font-semibold">
                                            株式会社{companyData.coporate_name}
                                        </p>
                                        <p className="mt-2">
                                            {companyData.pref}
                                            {companyData.city}
                                            {companyData.area}
                                            {companyData.street}
                                            <br />
                                            {companyData.building}
                                        </p>
                                    </div>
                                </>
                            )}
                            {isInvalid && (
                                <>
                                    <WarningIcon
                                        size={14}
                                        color="#b91c1c"
                                        className="mr-4 fill-[#b91c1c]"
                                    />
                                    <div className="text-[12px]">
                                        <p className="text-red-700">
                                            法人番号から法人情報を取得できませんでした。
                                            <br />
                                            正しく法人番号を入力してください。
                                        </p>
                                    </div>
                                </>
                            )}
                            {isLoading && <div>ロディング中...</div>}
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                type="submit"
                                className={
                                    "bg-primary hover:bg-primary-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 rounded-full lg:w-[60%] w-[100%] mb-4" +
                                    (!canSend
                                        ? " disabled:opacity-50 disabled:cursor-not-allowed"
                                        : "")
                                }
                                disabled={!canSend}
                            >
                                次へ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </CompanyGuestLayout>
    );
}
