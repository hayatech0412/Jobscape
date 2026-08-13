import { useMemo, useState } from "react";
import MasterForm from "@/Components/Companies/MasterForm";
import LinkArrow from "@/Components/Icons/LinkArrow";
import InputError from "@/Components/InputError";
import { Link, usePage, useForm } from "@inertiajs/react";
import CompanyGuestLayout from "@/Layouts/Company/CompanyGuestLayout";

export default function OfficeInfo({}) {
    const managerTemplate = {
        first_name: "",
        last_name: "",
        first_kana: "",
        last_kana: "",
        phone_number: "",
        email: "",
        card_front: "",
        card_front_file: undefined,
        card_front_path: "",
        card_back: "",
        card_back_file: undefined,
        card_back_path: "",
    };

    const { originCompany, employee_counts, earning_amounts, categories } =
        usePage().props;

    const { setData, post, errors } = useForm({});

    const [company, setCompany] = useState({
        employee_count: originCompany.employee_count ?? "",
        earning_amount: originCompany.earning_amount ?? "",
        main_category: originCompany.category_id ?? "",
        is_exist_other: originCompany.managers.length ? "1" : "0",
        managers: [
            ...originCompany.managers,
            ...Array(3 - originCompany.managers.length).fill(managerTemplate),
        ],
    });
    const [managerInputStatus, setManagerInputStatus] = useState(
        Array(3).fill(0)
    );

    const dataWatcher = useMemo(
        () => {
            setData(company);
        },
        [company],
        true
    );

    const handleSelectOption = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex].value;
        setCompany({ ...company, [e.target.name]: selectedOption });
    };

    const handleRadioboxChange = (e) => {
        setCompany({
            ...company,
            is_exist_other: e.target.value,
        });
    };

    const setCompanyManagers = (id, manager) => {
        const newManagers = company.managers.map((item, index) => {
            return index === id ? manager : item;
        });
        setCompany({
            ...company,
            managers: newManagers,
        });
    };

    const handleManagerChange = (e) => {
        const id = parseInt(e.target.getAttribute("data"));
        const { name, value } = e.target;
        const newManager = {
            ...company.managers[id],
            [name]: value,
        };

        setCompanyManagers(id, newManager);
    };

    const handleFileSelect = (e) => {
        const id = parseInt(e.target.getAttribute("data"));
        const name = e.target.name;
        const name_file = `${name}_file`;
        const file = e.target.files[0];
        const newManager = {
            ...company.managers[id],
            [name]: file.name,
            [name_file]: file,
        };
        setCompanyManagers(id, newManager);
    };

    const handleFileDelete = (e) => {
        const id = parseInt(e.target.getAttribute("data"));
        const name = e.target.name;
        const name_file = `${name}_file`;
        const newManager = {
            ...company.managers[id],
            [name]: "",
            [name_file]: undefined,
        };
        setCompanyManagers(id, newManager);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("validate result is ", checkValidate());

        post(route("company.register.office.info"));
    };

    const checkValidate = () => {
        var isEmptyManagers = Array(3).fill(0);
        var isValid = true;
        if (company.is_exist_other === "1") {
            company.managers.map((item, index) => {
                if (item.first_name === "") isEmptyManagers[index] += 1;
                if (item.last_name === "") isEmptyManagers[index] += 10;
                if (item.first_kana === "") isEmptyManagers[index] += 100;
                if (item.last_kana === "") isEmptyManagers[index] += 1000;
                if (item.phone_number === "") isEmptyManagers[index] += 10000;
                if (item.email === "") isEmptyManagers[index] += 100000;
                if (item.card_front === "") isEmptyManagers[index] += 1000000;
                if (item.card_back === "") isEmptyManagers[index] += 10000000;

                const newInputStatus = managerInputStatus.map((item, i) => {
                    return i === index ? isEmptyManagers[index] : item;
                });
                setManagerInputStatus(newInputStatus);

                if (isValid) {
                    isValid =
                        isEmptyManagers[index] === 0 ||
                        isEmptyManagers[index] === 11111111;
                }
            });
        }

        return (
            company.employee_count !== "" &&
            company.earning_amount !== "" &&
            company.main_category !== "" &&
            (company.is_exist_other === "0" ||
                (company.is_exist_other === "1" && isValid))
        );
    };

    return (
        <CompanyGuestLayout>
            <div className="bg-white lg:px-[60px] px-[20px] lg:py-[80px] py-[40px] shadow-md lg:w-[80%] mx-auto w-full">
                <div className="lg:w-[80%] w-full mx-auto">
                    <h2 className="lg:text-[24px] text-[22px] w-full text-left font-bold">
                        あなたの事業をおしえてください
                    </h2>

                    <p className="mt-4">
                        ご登録情報、商材に合わせたサービスをご案内いたします。
                    </p>

                    <Link
                        href="./"
                        className="w-fit flex items-center justify-start block text-primary mt-2 text-[12px]"
                    >
                        事業者情報の使用について
                        <LinkArrow className="text-primary -rotate-45" />
                    </Link>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-12 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">事業について</span>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="employee_count"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                從業員数
                            </label>

                            <select
                                name="employee_count"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={company.employee_count}
                                onChange={handleSelectOption}
                            >
                                <option key="" value="">
                                    選択してください
                                </option>
                                {employee_counts.map((employee_count) => (
                                    <option
                                        key={employee_count.key}
                                        value={employee_count.value}
                                    >
                                        {employee_count.label}
                                    </option>
                                ))}
                            </select>
                            {errors.employee_count && (
                                <InputError
                                    message={errors.employee_count}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="earning_amount"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                年間売上
                            </label>

                            <select
                                name="earning_amount"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleSelectOption}
                                value={company.earning_amount}
                            >
                                <option key="" value="">
                                    選択してください
                                </option>
                                {earning_amounts.map((earning_amount) => (
                                    <option
                                        key={earning_amount.key}
                                        value={earning_amount.value}
                                    >
                                        {earning_amount.label}
                                    </option>
                                ))}
                            </select>
                            {errors.earning_amount && (
                                <InputError
                                    message={errors.earning_amount}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="main_category"
                                className="text-[12px] block text-gray-700 font-bold mb-1"
                            >
                                主な商材
                            </label>

                            <select
                                name="main_category"
                                className="appearance-none border border-gray-300 rounded w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleSelectOption}
                                value={company.main_category}
                            >
                                <option key="" value="">
                                    選択してください
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.main_category && (
                                <InputError
                                    message={errors.main_category}
                                    className="mt-1 text-[12px]"
                                />
                            )}
                        </div>

                        <div className="mt-12 flex items-center leading-none font-semibold">
                            <span className="text-primary text-[10px]">●</span>
                            <span className="ml-1">アカウント管理者登録</span>
                        </div>

                        <p className="mt-4 text-[12px]">
                            法人代表者またはご担当者1名の管理者登録をお願いいたします。取引についてのお問い合わせ、アカウント認証時に事務局よりご連絡させていただく場合がございます。
                            <br />
                            管理者は代表含め計3名まで登録が可能です。
                        </p>

                        <Link
                            href="./"
                            className="w-fit flex items-center justify-start block text-primary mt-2 text-[12px]"
                        >
                            アカウント管理者登録について
                            <LinkArrow className="text-primary -rotate-45" />
                        </Link>

                        <div className="lg:flex lg:flex-row items-center justify-start lg:gap-10 mt-6">
                            <label className="block lg:mt-3 flex flex-row items-center font-semibold">
                                <input
                                    type="radio"
                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                    name="is_exist_other"
                                    value={0}
                                    checked={company.is_exist_other === "0"}
                                    onChange={handleRadioboxChange}
                                />
                                <span>代表者と同じ</span>
                            </label>
                            <label className="block lg:mt-3 flex flex-row items-center font-semibold">
                                <input
                                    type="radio"
                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                    name="is_exist_other"
                                    value={1}
                                    checked={company.is_exist_other === "1"}
                                    onChange={handleRadioboxChange}
                                />
                                <span>代表者以外の管理者を登録する</span>
                            </label>
                        </div>

                        {company.managers.map((manager, index) => (
                            <MasterForm
                                key={index}
                                index={index}
                                info={manager}
                                onInputChange={handleManagerChange}
                                onSelectedFile={handleFileSelect}
                                onDeletedFile={handleFileDelete}
                                disabled={company.is_exist_other === "0"}
                                inputStatus={managerInputStatus[index]}
                            />
                        ))}

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
