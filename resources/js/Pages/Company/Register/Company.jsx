import LinkArrow from "@/Components/Icons/LinkArrow";
import SearchIcon from "@/Components/Icons/SearchIcon";
import InputError from "@/Components/InputError";
import CompanyGuestLayout from "@/Layouts/Company/CompanyGuestLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";

export default function Company() {
    const { company, coporate_types, back_url } = usePage().props;
    const { data, setData, post, errors } = useForm({});

    const [companyInfo, setCompanyInfo] = useState({
        is_coporate: false,
        nickname: company.nickname ?? "",
        coporate_name: company.coporate_name ?? "",
        coporate_kana: company.coporate_kana ?? "",
        coporate_code: company.coporate_code ?? "",
        postal_code: company.postal_code ?? "",
        pref: company.pref ?? "",
        city: company.city ?? "",
        city_kana: company.city_kana ?? "",
        area: company.area ?? "",
        area_kana: company.area_kana ?? "",
        street: company.street ?? "",
        building: company.building ?? "",
        building_kana: company.building_kana ?? "",
        phone_number: company.phone_number ?? "",
        is_site_url: company.site_url && company.site_url !== "",
        site_url: company.site_url ?? "",
        is_pamphlet: company.pamphlet && company.pamphlet !== "",
        pamphlet: company.pamphlet ?? "",
        pamphlet_file: company.pamphlet_file ?? "",
        invoice_number: company.invoice_number ?? "",
        first_name: company.first_name ?? "",
        first_kana: company.first_kana ?? "",
        last_name: company.last_name ?? "",
        last_kana: company.last_kana ?? "",
    });

    const [isSelected, setIsSelected] = useState(true);
    const [isEmptyUrl, setIsEmptyUrl] = useState(false);
    const [isEmptyFile, setIsEmptyFile] = useState(false);
    const [isFileSelected, setIsFileSelected] = useState(
        company.pamphlet && company.pamphlet !== ""
    );
    const [isEmptyPhone, setIsEmptyPhone] = useState(false);
    const [isEmptyFirst, setIsEmptyFirst] = useState(false);
    const [isEmptyLast, setIsEmptyLast] = useState(false);
    const [isEmptyFirstKana, setIsEmptyFirstKana] = useState(false);
    const [isEmptyLastKana, setIsEmptyLastKana] = useState(false);

    const fileRef = useRef();

    const dataWatcher = useMemo(
        () => {
            setData(companyInfo);
        },
        [companyInfo],
        true
    );

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCompanyInfo({ ...companyInfo, [name]: checked });
    };

    const handleSelectedOption = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex].value;
        setCompanyInfo({ ...companyInfo, nickname: selectedOption });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo({ ...companyInfo, [name]: value });
    };

    const handleSelectedFile = (e) => {
        const file = fileRef.current.files[0];

        setCompanyInfo({
            ...companyInfo,
            pamphlet: file ? file.name : "",
            pamphlet_file: file,
        });

        setIsEmptyFile(companyInfo.is_pamphlet && e.target.value.length === 0);
        setIsFileSelected(e.target.files.length > 0);
    };

    const selectPamphlet = () => {
        fileRef.current.click();
    };

    const deletePamphlet = () => {
        setIsFileSelected(false);
        setCompanyInfo({
            ...companyInfo,
            pamphlet: "",
            pamphlet_file: undefined,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!checkValidation()) {
            post(route("company.register.company"));
        }
    };

    const checkValidation = () => {
        //     const _isNotSelected = !data.nickname || data.nickname === "";
        const _isEmptyUrl =
            data.is_site_url && (!data.site_url || data.site_url === "");
        const _isEmptyFile =
            data.is_pamphlet && (!data.pamphlet || data.pamphlet === "");
        //     const _isEmptyPhone = !data.phone_number || data.phone_number === "";
        //     const _isEmptyFirst = !data.first_name || data.first_name === "";
        //     const _isEmptyLast = !data.last_name || data.last_name === "";
        //     const _isEmptyFirstKana = !data.first_kana || data.first_kana === "";
        //     const _isEmptyLastKana = !data.last_kana || data.last_kana === "";

        //     setIsSelected(!_isNotSelected);
        setIsEmptyUrl(_isEmptyUrl);
        setIsEmptyFile(_isEmptyFile);
        //     setIsEmptyPhone(_isEmptyPhone);
        //     setIsEmptyFirst(_isEmptyFirst);
        //     setIsEmptyLast(_isEmptyLast);
        //     setIsEmptyFirstKana(_isEmptyFirstKana);
        //     setIsEmptyLastKana(_isEmptyLastKana);

        return (
            //         _isNotSelected ||
            _isEmptyUrl || _isEmptyFile
            //         _isEmptyPhone ||
            //         _isEmptyFirst ||
            //         _isEmptyLast ||
            //         _isEmptyFirstKana ||
            //         _isEmptyLastKana
        );
    };

    return (
        <CompanyGuestLayout>
            <div className="bg-white lg:px-[60px] px-[20px] lg:py-[80px] py-[40px] shadow-md lg:w-[80%] mx-auto w-full">
                <div className="lg:w-[80%] w-full mx-auto">
                    <h2 className="lg:text-[24px] text-[22px] w-full text-left font-bold">
                        法人事業者情報登録
                    </h2>

                    <p className="mt-4">
                        JOBSCAPEへの出品には事業者情報が必要です。入力した情報は審査、出品情報等に使用されます。
                    </p>

                    <Link
                        href={back_url}
                        className="flex items-center justify-start block text-primary mt-2 text-[12px]"
                    >
                        法人事業者登録について
                        <LinkArrow className="text-primary -rotate-45" />
                    </Link>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row items-center justify-between mt-6">
                            <label className="block flex flex-row items-center font-semibold">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                    name="is_coporate"
                                    checked={
                                        companyInfo.coporate_code !== null &&
                                        companyInfo.coporate_code !== ""
                                    }
                                    onChange={handleCheckboxChange}
                                />
                                <span>法人</span>
                            </label>
                            <Link
                                href="./"
                                className="flex items-center justify-start block text-primary text-[12px]"
                            >
                                <SearchIcon className="text-primary" />
                                法人を再検索する
                            </Link>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="nickname"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                法人呼称
                            </label>

                            <select
                                name="nickname"
                                id="nickname"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={companyInfo.nickname ?? ""}
                                onChange={handleSelectedOption}
                            >
                                <option value="">選択してください</option>
                                {coporate_types.map((type) => (
                                    <option key={type.key} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            <p
                                className={`text-[12px] mt-1 ${
                                    !isSelected ? "text-red-700" : ""
                                }`}
                            >
                                選択肢にない場合は、「その他」を選択してください
                            </p>
                            {errors.nickname && (
                                <InputError
                                    message={errors.nickname}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="coporate_name"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                法人名
                            </label>

                            <input
                                name="coporate_name"
                                id="coporate_name"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                disabled
                                readOnly
                                value={companyInfo.coporate_name ?? ""}
                                placeholder="JOBSCAPE"
                            />
                            <p className="text-[12px] mt-1">
                                法人呼称を省いて入力してください
                            </p>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="coporate_kana"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                法人名カナ
                            </label>

                            <input
                                name="coporate_kana"
                                id="coporate_kana"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="ジョブスケープ"
                                value={companyInfo.coporate_kana ?? ""}
                                onChange={handleInputChange}
                            />
                            <p className="text-[12px] mt-1">
                                法人呼称を省いてカタカナ入力してください
                            </p>
                            {errors.nickname && (
                                <InputError
                                    message={errors.coporate_kana}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="coporate_code"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                法人番号
                            </label>

                            <input
                                name="coporate_code"
                                id="coporate_code"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                disabled
                                readOnly
                                value={companyInfo.coporate_code ?? ""}
                                placeholder="1234567890123"
                            />
                        </div>

                        <div className="mt-6 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">法人住所</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between lg:gap-4">
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="postal_code"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    郵便番号
                                </label>

                                <input
                                    name="postal_code"
                                    id="postal_code"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                    disabled
                                    readOnly
                                    value={companyInfo.postal_code ?? ""}
                                    placeholder="1040045"
                                />
                            </div>
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="pref"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    都道府県
                                </label>

                                <input
                                    name="pref"
                                    id="pref"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                    disabled
                                    readOnly
                                    value={companyInfo.pref ?? ""}
                                    placeholder="東京都"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="city"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                市区町村
                            </label>

                            <input
                                name="city"
                                id="city"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                disabled
                                readOnly
                                value={companyInfo.city ?? ""}
                                placeholder="中央区"
                            />
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="city_kana"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                市区町村カナ
                            </label>

                            <input
                                name="city_kana"
                                id="city_kana"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="チュウオウク"
                                value={companyInfo.city_kana ?? ""}
                                onChange={handleInputChange}
                            />
                            {errors.city_kana && (
                                <InputError
                                    message={errors.city_kana}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="area"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                町城
                            </label>

                            <input
                                name="area"
                                id="area"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                disabled
                                readOnly
                                value={companyInfo.area ?? ""}
                                placeholder="築地"
                            />
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="area_kana"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                町城カナ
                            </label>

                            <input
                                name="area_kana"
                                id="area_kana"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="ツキジ"
                                value={companyInfo.area_kana ?? ""}
                                onChange={handleInputChange}
                            />
                            {errors.area_kana && (
                                <InputError
                                    message={errors.area_kana}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="street"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                丁目・番地・号
                            </label>

                            <input
                                name="street"
                                id="street"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                disabled
                                readOnly
                                value={companyInfo.street ?? ""}
                                placeholder="3-4-13"
                            />
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="building"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                建物名・階数・部屋番号
                            </label>

                            <input
                                name="building"
                                id="building"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                disabled
                                readOnly
                                value={companyInfo.building ?? ""}
                                placeholder="電気工事会館 5階"
                            />
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="building_kana"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                建物名・階数・部屋番号カナ
                            </label>

                            <input
                                name="building_kana"
                                id="building_kana"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="デンキコウジカイカン5カイ"
                                value={companyInfo.building_kana ?? ""}
                                onChange={handleInputChange}
                            />
                            {errors.building_kana && (
                                <InputError
                                    message={errors.building_kana}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-6 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">法人代表電話番号</span>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="phone_number"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                電話番号
                            </label>

                            <input
                                name="phone_number"
                                id="phone_number"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="例：0345678910"
                                value={companyInfo.phone_number ?? ""}
                                onChange={handleInputChange}
                            />
                            <p className="text-[12px] mt-1">
                                ハイフンなしで入力してください
                            </p>
                            {errors.phone_number && (
                                <InputError
                                    message={errors.phone_number}
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
                            <span className="ml-1">会社招介</span>
                        </div>

                        <p className="mt-2">
                            下記のいずれかの方法で会社紹介をご提供ください。
                        </p>

                        <div className="mt-3">
                            <label className="block flex flex-row items-center font-semibold">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                    name="is_site_url"
                                    checked={companyInfo.is_site_url ?? false}
                                    onChange={handleCheckboxChange}
                                />
                                <span>webサイトリンク</span>
                            </label>

                            <input
                                name="site_url"
                                id="site_url"
                                className="appearance-none border border-gray-300 rounded mt-3 w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="ホームページまたは商材のURL"
                                value={companyInfo.site_url ?? ""}
                                onChange={handleInputChange}
                            />
                            {errors.site_url && (
                                <InputError
                                    message={errors.site_url}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                            {isEmptyUrl && (
                                <InputError
                                    message="サwebサイトリンクをチェクするとURLは必須です"
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-6">
                            <label className="block flex flex-row items-center font-semibold">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                    name="is_pamphlet"
                                    checked={companyInfo.is_pamphlet ?? false}
                                    onChange={handleCheckboxChange}
                                />
                                <span>パンフレットの添付</span>
                            </label>

                            <div className="text-[12px] mt-3">
                                パンフレットテータの添付
                                {!isFileSelected && (
                                    <>
                                        <button
                                            type="button"
                                            className="border border-primary mx-2 px-2 py-1 rounded-full hover:bg-primary hover:text-white hover:font-semibold"
                                            onClick={selectPamphlet}
                                        >
                                            ファイルの選択
                                        </button>
                                        <span className="text-gray-400">
                                            4MBまで
                                        </span>
                                    </>
                                )}
                                {isFileSelected && (
                                    <>
                                        <span className="ml-2">
                                            {companyInfo.pamphlet}
                                        </span>
                                        <button
                                            type="button"
                                            className="border border-red-700 mx-2 px-3 py-1 rounded-full text-red-700 hover:bg-red-700 hover:text-white hover:font-semibold"
                                            onClick={deletePamphlet}
                                        >
                                            削除
                                        </button>
                                    </>
                                )}
                                {isEmptyFile && (
                                    <InputError
                                        message="パンフレットチェクすると添付の選択は必須です"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>

                            <input
                                type="file"
                                ref={fileRef}
                                name="pamphlet"
                                id="pamphlet"
                                className="hidden"
                                onChange={handleSelectedFile}
                            />
                        </div>

                        <div className="mt-6 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">
                                インポイス登録番号（任意）
                            </span>
                        </div>

                        <div className="mt-3">
                            <div className="flex flex-row items-center justify-start gap-1">
                                <span className="font-semibold">T-</span>
                                <input
                                    name="invoice_number"
                                    id="invoice_number"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：12345678910111"
                                    value={companyInfo.invoice_number ?? ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <p className="text-[12px] mt-1">
                                T-以降の数字を入力してください
                            </p>
                        </div>

                        <div className="mt-6 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">代表者情報</span>
                        </div>

                        <div className="flex flex-wrap items-start justify-between lg:gap-4">
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="first_name"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    姓
                                </label>

                                <input
                                    name="first_name"
                                    id="first_name"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：山田"
                                    value={companyInfo.first_name ?? ""}
                                    onChange={handleInputChange}
                                />
                                {errors.first_name && (
                                    <InputError
                                        message={errors.first_name}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyFirst && (
                                    <InputError
                                        message="姓を入力してください"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="last_name"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    名
                                </label>

                                <input
                                    name="last_name"
                                    id="last_name"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：太郎"
                                    value={companyInfo.last_name ?? ""}
                                    onChange={handleInputChange}
                                />
                                {errors.last_name && (
                                    <InputError
                                        message={errors.last_name}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyLast && (
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
                                    htmlFor="first_kana"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    姓カナ
                                </label>

                                <input
                                    name="first_kana"
                                    id="first_kana"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：ヤマダ"
                                    value={companyInfo.first_kana ?? ""}
                                    onChange={handleInputChange}
                                />
                                {errors.first_kana && (
                                    <InputError
                                        message={errors.first_kana}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyFirstKana && (
                                    <InputError
                                        message="姓カナを入力してください"
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                            </div>
                            <div className="mt-3 lg:flex-1 w-full">
                                <label
                                    htmlFor="last_kana"
                                    className="text-[12px] block text-gray-700 font-bold mb-1"
                                >
                                    名カナ
                                </label>

                                <input
                                    name="last_kana"
                                    id="last_kana"
                                    className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="例：タロウ"
                                    value={companyInfo.last_kana ?? ""}
                                    onChange={handleInputChange}
                                />
                                {errors.last_kana && (
                                    <InputError
                                        message={errors.last_kana}
                                        className="mt-1 text-[12px]"
                                    />
                                )}
                                {isEmptyLastKana && (
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
