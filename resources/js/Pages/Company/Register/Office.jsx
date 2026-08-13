import LinkArrow from "@/Components/Icons/LinkArrow";
import InputError from "@/Components/InputError";
import CompanyGuestLayout from "@/Layouts/Company/CompanyGuestLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

export default function Office() {
    const { company } = usePage().props;
    const { data, setData, post, errors } = useForm({});

    const [office, setOffice] = useState({
        office_type: company.office_type ?? 0,
        office_name: company.office_name ?? "",
        office_name_kana: company.office_name_kana ?? "",
        office_postal_code: company.office_postal_code ?? "",
        office_pref: company.office_pref ?? "",
        office_city: company.office_city ?? "",
        office_area: company.office_area ?? "",
        office_street: company.office_street ?? "",
        office_building: company.office_building ?? "",
        office_phone_number: company.office_phone_number ?? "",
        office_master_first_name: company.office_master_first_name ?? "",
        office_master_first_kana: company.office_master_first_kana ?? "",
        office_master_last_name: company.office_master_last_name ?? "",
        office_master_last_kana: company.office_master_last_kana ?? "",
    });

    const [isEmptyName, setIsEmptyName] = useState(false);
    const [isEmptyCode, setIsEmptyCode] = useState(false);
    const [isInvalidPhone, setIsInvalidPhone] = useState(false);
    const [isEmptyPhone, setIsEmptyPhone] = useState(false);
    const [isEmptyMFirst, setIsEmptyMFirst] = useState(false);
    const [isEmptyMFirstKana, setIsEmptyMFirstKana] = useState(false);
    const [isEmptyMLast, setIsEmptyMLast] = useState(false);
    const [isEmptyMLastKana, setIsEmptyMLastKana] = useState(false);

    const dataWatcher = useMemo(
        () => {
            setData(office);
        },
        [office],
        true
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const inputted = name === "office_type" ? parseInt(value) : value;
        setOffice({ ...office, [name]: inputted });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (checkValidate()) {
            post(route("company.register.office"));
        }
    };

    const checkValidate = () => {
        setIsEmptyName(data.office_name === "");
        setIsEmptyCode(data.office_postal_code === "");
        setIsEmptyPhone(data.office_phone_number === "");
        setIsEmptyMFirst(data.office_master_first_name === "");
        setIsEmptyMFirstKana(data.office_master_first_kana === "");
        setIsEmptyMLast(data.office_master_last_name === "");
        setIsEmptyMLastKana(data.office_master_last_kana === "");
        setIsInvalidPhone(
            data.office_phone_number !== "" &&
                !/[0-9]/.test(data.office_phone_number)
        );

        return !(
            data.office_name === "" ||
            data.office_postal_code === "" ||
            data.office_phone_number === "" ||
            data.office_master_first_name === "" ||
            data.office_master_first_kana === "" ||
            data.office_master_last_name === "" ||
            data.office_master_last_kana === "" ||
            (data.office_phone_number !== "" &&
                !/[0-9]/.test(data.office_phone_number))
        );
    };

    return (
        <CompanyGuestLayout>
            <div className="bg-white lg:px-[60px] px-[20px] lg:py-[80px] py-[40px] shadow-md lg:w-[80%] mx-auto w-full">
                <div className="lg:w-[80%] w-full mx-auto">
                    <h2 className="lg:text-[24px] text-[22px] w-full text-left font-bold">
                        支社・支店、事業所での登録
                    </h2>

                    <p className="mt-4">
                        支社・支店等、事業所名でのご登録を希望される場合は、以下へご入力ください。代表本社でご登録される場合は「スキップ」してください。
                    </p>

                    <Link
                        href="./"
                        className="w-fit flex items-center justify-start block text-primary mt-2 text-[12px]"
                    >
                        事業所登録について
                        <LinkArrow className="text-primary -rotate-45" />
                    </Link>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap items-center justify-between mt-6">
                            <div className="flex items-center justify-start gap-4 mr-auto">
                                <label className="block flex flex-row items-center font-semibold">
                                    <input
                                        type="radio"
                                        name="office_type"
                                        className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-1"
                                        value={1}
                                        checked={office.office_type === 1}
                                        onChange={handleInputChange}
                                    />
                                    <span>代表本社</span>
                                </label>
                                <label className="block flex flex-row items-center font-semibold">
                                    <input
                                        type="radio"
                                        name="office_type"
                                        className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-1"
                                        value={2}
                                        checked={office.office_type === 2}
                                        onChange={handleInputChange}
                                    />
                                    <span>支社・支店</span>
                                </label>
                                <label className="block flex flex-row items-center font-semibold">
                                    <input
                                        type="radio"
                                        name="office_type"
                                        className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-1"
                                        value={3}
                                        checked={office.office_type === 3}
                                        onChange={handleInputChange}
                                    />
                                    <span>その他</span>
                                </label>
                            </div>
                            <Link
                                href={route(
                                    "company.register.office.info.show"
                                )}
                                className="block border border-primary text-primary hover:bg-primary hover:text-white hover:font-semibold rounded-full px-8 py-1 text-[12px] lg:mt-0 mt-2"
                            >
                                スキップ
                            </Link>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="office_name"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                事業所名
                            </label>

                            <input
                                name="office_name"
                                id="office_name"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：株式会社JOBSCAPE OO支社"
                                value={office.office_name}
                                onChange={handleInputChange}
                            />
                            <p
                                className={`text-[12px] mt-1 ${
                                    isEmptyName ? "text-red-700" : ""
                                }`}
                            >
                                総称を入力してください
                            </p>
                            {errors.office_name && (
                                <InputError
                                    message={errors.office_name}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="office_name_kana"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                事業所名カナ
                            </label>

                            <input
                                name="office_name_kana"
                                id="office_name_kana"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：カブシキガイシャジョブスケープ〇〇シシャ"
                                value={office.office_name_kana}
                                onChange={handleInputChange}
                            />
                            <p className="text-[12px] mt-1">
                                総称カナを入力してください
                            </p>
                            {errors.office_name_kana && (
                                <InputError
                                    message={errors.office_name_kana}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-6 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">事業所住所</span>
                        </div>

                        <div className="flex flex-wrap items-start justify-between lg:gap-4">
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="office_postal_code"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    郵便番号
                                </label>

                                <input
                                    name="office_postal_code"
                                    id="office_postal_code"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：1040045"
                                    value={office.office_postal_code}
                                    onChange={handleInputChange}
                                />
                                {errors.office_postal_code && (
                                    <InputError
                                        message={errors.office_postal_code}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyCode && (
                                    <InputError
                                        message="郵便番号を入力してください"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="office_pref"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    都道府県
                                </label>

                                <input
                                    name="office_pref"
                                    id="office_pref"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：東京都"
                                    value={office.office_pref}
                                    onChange={handleInputChange}
                                />
                                {errors.office_pref && (
                                    <InputError
                                        message={errors.office_pref}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="office_city"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                市区町村
                            </label>

                            <input
                                name="office_city"
                                id="office_city"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：中央区"
                                value={office.office_city}
                                onChange={handleInputChange}
                            />
                            {errors.office_city && (
                                <InputError
                                    message={errors.office_city}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="office_area"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                町城
                            </label>

                            <input
                                name="office_area"
                                id="office_area"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：築地"
                                value={office.office_area}
                                onChange={handleInputChange}
                            />
                            {errors.office_area && (
                                <InputError
                                    message={errors.office_area}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="office_street"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                丁目・番地・号
                            </label>

                            <input
                                name="office_street"
                                id="office_street"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：3-4-13"
                                value={office.office_street}
                                onChange={handleInputChange}
                            />
                            {errors.office_street && (
                                <InputError
                                    message={errors.office_street}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="office_building"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                建物名・階数・部屋番号
                            </label>

                            <input
                                name="office_building"
                                id="office_building"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：電気工事会館5階"
                                value={office.office_building}
                                onChange={handleInputChange}
                            />
                            {errors.office_building && (
                                <InputError
                                    message={errors.office_building}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-6 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">事業所電話番号</span>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="office_phone_number"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                電話番号
                            </label>

                            <input
                                name="office_phone_number"
                                id="office_phone_number"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：0345678910"
                                value={office.office_phone_number}
                                onChange={handleInputChange}
                            />
                            <p
                                className={`text-[12px] mt-1${
                                    isInvalidPhone ? " text-red-700" : ""
                                }`}
                            >
                                ハイフンなしで入力してください
                            </p>
                            {errors.office_phone_number && (
                                <InputError
                                    message={errors.office_phone_number}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                            {isEmptyPhone && (
                                <InputError
                                    message="電話番号を入力してください"
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-6 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">事業所代表者情報</span>
                        </div>

                        <div className="flex flex-wrap items-start justify-between lg:gap-4">
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="office_master_first_name"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    姓
                                </label>

                                <input
                                    name="office_master_first_name"
                                    id="office_master_first_name"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：山田"
                                    value={office.office_master_first_name}
                                    onChange={handleInputChange}
                                />
                                {errors.office_master_first_name && (
                                    <InputError
                                        message={
                                            errors.office_master_first_name
                                        }
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyMFirst && (
                                    <InputError
                                        message="姓を入力してください"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="office_master_last_name"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    名
                                </label>

                                <input
                                    name="office_master_last_name"
                                    id="office_master_last_name"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：太郎"
                                    value={office.office_master_last_name}
                                    onChange={handleInputChange}
                                />
                                {errors.office_master_last_name && (
                                    <InputError
                                        message={errors.office_master_last_name}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyMLast && (
                                    <InputError
                                        message="名を入力してください"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-start justify-between lg:gap-4">
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="office_master_first_kana"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    姓カナ
                                </label>

                                <input
                                    name="office_master_first_kana"
                                    id="office_master_first_kana"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：ヤマダ"
                                    value={office.office_master_first_kana}
                                    onChange={handleInputChange}
                                />
                                {errors.office_master_first_kana && (
                                    <InputError
                                        message={
                                            errors.office_master_first_kana
                                        }
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyMFirstKana && (
                                    <InputError
                                        message="姓カナを入力してください"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="office_master_last_kana"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    名カナ
                                </label>

                                <input
                                    name="office_master_last_kana"
                                    id="office_master_last_kana"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：タロウ"
                                    value={office.office_master_last_kana}
                                    onChange={handleInputChange}
                                />
                                {errors.office_master_last_kana && (
                                    <InputError
                                        message={errors.office_master_last_kana}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyMLastKana && (
                                    <InputError
                                        message="名カナを入力してください"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 rounded-full lg:w-[60%] w-[100%] mb-4"
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
